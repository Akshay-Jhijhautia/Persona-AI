export type PersonaId = "hitesh" | "piyush";

export type ChatRole = "user" | "assistant";

export type StageType = "INITIATE" | "THINK" | "ANALYSE" | "OUTPUT";

export type PipelineStage = {
  type: StageType;
  content: string;
};

export type PersonaChatResponse = {
  persona: PersonaId;
  stages: PipelineStage[];
  status: "STOP";
};

export type ChatMessage =
  | {
      id: string;
      role: "user";
      content: string;
    }
  | {
      id: string;
      role: "assistant";
      content: string;
      persona: PersonaId;
    };
