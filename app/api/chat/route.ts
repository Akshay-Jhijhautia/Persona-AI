import { NextResponse } from "next/server";
import { openai, OPENAI_MODEL } from "@/src/lib/openai";
import { buildSystemPrompt } from "@/src/lib/prompt";
import { isValidPersona } from "@/src/lib/personas";
import type { PersonaId } from "@/src/types/chat";

const STAGE_TYPES = ["INITIATE", "THINK", "ANALYSE", "OUTPUT"] as const;

type StageType = (typeof STAGE_TYPES)[number];

type RequestMessage = {
  role: "user" | "assistant";
  content: string;
};

type ChatRequestBody = {
  persona: PersonaId;
  messages: RequestMessage[];
};

type ChatResponse = {
  persona: PersonaId;
  stages: {
    type: StageType;
    content: string;
  }[];
  status: "STOP";
};

function createPersonaChatSchema(persona: PersonaId) {
  return {
    type: "object",
    additionalProperties: false,
    properties: {
      persona: {
        type: "string",
        enum: [persona],
      },
      stages: {
        type: "array",
        minItems: 1,
        items: {
          type: "object",
          additionalProperties: false,
          properties: {
            type: {
              type: "string",
              enum: STAGE_TYPES,
            },
            content: {
              type: "string",
            },
          },
          required: ["type", "content"],
        },
      },
      status: {
        type: "string",
        enum: ["STOP"],
      },
    },
    required: ["persona", "stages", "status"],
  } as const;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isRequestMessage(value: unknown): value is RequestMessage {
  if (!isRecord(value)) {
    return false;
  }

  return (
    (value.role === "user" || value.role === "assistant") &&
    typeof value.content === "string" &&
    value.content.trim().length > 0
  );
}

function isStageType(value: unknown): value is StageType {
  return (
    typeof value === "string" &&
    (STAGE_TYPES as readonly string[]).includes(value)
  );
}

function isChatResponse(
  value: unknown,
  expectedPersona: PersonaId,
): value is ChatResponse {
  if (
    !isRecord(value) ||
    value.persona !== expectedPersona ||
    value.status !== "STOP" ||
    !Array.isArray(value.stages) ||
    value.stages.length === 0
  ) {
    return false;
  }

  return value.stages.every(
    (stage) =>
      isRecord(stage) &&
      isStageType(stage.type) &&
      typeof stage.content === "string",
  );
}

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Something went wrong";
}

export async function POST(request: Request) {
  let requestBody: unknown;

  try {
    requestBody = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!isRecord(requestBody)) {
    return NextResponse.json(
      { error: "Request body must be a JSON object" },
      { status: 400 },
    );
  }

  const persona = requestBody.persona;

  if (!isValidPersona(persona)) {
    return NextResponse.json(
      { error: "Persona must be either hitesh or piyush" },
      { status: 400 },
    );
  }

  const messages = requestBody.messages;

  if (!Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json(
      { error: "Messages must be a non-empty array" },
      { status: 400 },
    );
  }

  if (!messages.every(isRequestMessage)) {
    return NextResponse.json(
      {
        error:
          "Each message must have a user or assistant role and non-empty content",
      },
      { status: 400 },
    );
  }

  const chatRequest: ChatRequestBody = { persona, messages };
  const recentMessages = chatRequest.messages.slice(-8);

  try {
    const response = await openai.responses.create({
      model: OPENAI_MODEL,
      instructions: buildSystemPrompt(chatRequest.persona),
      input: recentMessages.map((message) => ({
        role: message.role,
        content: message.content.trim(),
      })),
      text: {
        format: {
          type: "json_schema",
          name: "persona_chat_response",
          strict: true,
          schema: createPersonaChatSchema(chatRequest.persona),
        },
      },
    });

    let parsedResponse: unknown;

    try {
      parsedResponse = JSON.parse(response.output_text);
    } catch {
      return NextResponse.json(
        { error: "Model returned invalid JSON" },
        { status: 502 },
      );
    }

    if (!isChatResponse(parsedResponse, chatRequest.persona)) {
      return NextResponse.json(
        { error: "Model returned an invalid response structure" },
        { status: 502 },
      );
    }

    return NextResponse.json(parsedResponse);
  } catch (error) {
    console.error("Chat API error:", error);

    return NextResponse.json(
      {
        error: "Failed to generate response",
        details: getErrorMessage(error),
      },
      { status: 500 },
    );
  }
}
