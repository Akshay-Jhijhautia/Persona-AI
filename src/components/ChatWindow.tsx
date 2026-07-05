"use client";

import { FormEvent, useState } from "react";
import type { ChatMessage, PersonaId } from "../types/chat";

type ChatWindowProps = {
  selectedPersona: PersonaId;
  isDark: boolean;
};

function getPersonaName(persona: PersonaId) {
  return persona === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg";
}

function createMessageId() {
  return crypto.randomUUID();
}

function getTemporaryAssistantResponse(persona: PersonaId) {
  if (persona === "hitesh") {
    return "Arey bilkul, ye response abhi temporary hai. Next step mein hum yahi jagah OpenAI API se connect karenge.";
  }

  return "Yes, this is a temporary response. Next step mein isko real GPT-4o response se replace karenge. Basic UI is done.";
}

export default function ChatWindow({
  selectedPersona,
  isDark,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedInput = inputValue.trim();

    if (!trimmedInput) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: trimmedInput,
    };

    const assistantMessage: ChatMessage = {
      id: createMessageId(),
      role: "assistant",
      persona: selectedPersona,
      content: getTemporaryAssistantResponse(selectedPersona),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    setInputValue("");
  }

  return (
    <div className="flex min-h-[520px] flex-1 flex-col gap-4">
      <div
        className={
          isDark
            ? "flex-1 overflow-y-auto rounded-2xl border border-slate-800 bg-slate-950 p-4"
            : "flex-1 overflow-y-auto rounded-2xl border border-slate-200 bg-slate-50 p-4"
        }
      >
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div>
              <p
                className={
                  isDark
                    ? "text-sm font-medium text-slate-300"
                    : "text-sm font-medium text-slate-700"
                }
              >
                Ask your first question
              </p>
              <p
                className={
                  isDark
                    ? "mt-2 max-w-md text-sm text-slate-500"
                    : "mt-2 max-w-md text-sm text-slate-500"
                }
              >
                Try asking about recursion, a todo app, JavaScript concepts, or
                a small math problem.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={isUser ? "flex justify-end" : "flex justify-start"}
                >
                  <div
                    className={
                      isUser
                        ? "max-w-[80%] rounded-2xl bg-cyan-600 px-4 py-3 text-sm text-white"
                        : isDark
                          ? "max-w-[80%] rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100"
                          : "max-w-[80%] rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800"
                    }
                  >
                    {!isUser && message.persona && (
                      <p
                        className={
                          isDark
                            ? "mb-1 text-xs font-semibold text-cyan-400"
                            : "mb-1 text-xs font-semibold text-cyan-700"
                        }
                      >
                        {getPersonaName(message.persona)}
                      </p>
                    )}

                    <p className="whitespace-pre-wrap leading-relaxed">
                      {message.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          placeholder={`Ask ${getPersonaName(selectedPersona)} something...`}
          className={
            isDark
              ? "flex-1 rounded-full border border-slate-700 bg-slate-950 px-5 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
              : "flex-1 rounded-full border border-slate-300 bg-white px-5 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 focus:border-cyan-600"
          }
        />

        <button
          type="submit"
          className={
            isDark
              ? "rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-300"
              : "rounded-full bg-cyan-600 px-6 py-3 text-sm font-semibold text-white hover:bg-cyan-700"
          }
        >
          Send
        </button>
      </form>
    </div>
  );
}
