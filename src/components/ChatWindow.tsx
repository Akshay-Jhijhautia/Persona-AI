"use client";

import { useEffect, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { ChatMessage, PersonaId } from "../types/chat";

type ChatWindowProps = {
  selectedPersona: PersonaId;
  onPersonaChange: (persona: PersonaId) => void;
  isDark: boolean;
};

const personas: { id: PersonaId; name: string }[] = [
  { id: "hitesh", name: "Hitesh Choudhary" },
  { id: "piyush", name: "Piyush Garg" },
];

function getPersonaName(persona: PersonaId) {
  return persona === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg";
}

function createMessageId() {
  return crypto.randomUUID();
}

function getTemporaryAssistantResponse(persona: PersonaId, question: string) {
  if (persona === "hitesh") {
    return `Haan ji! You asked: “${question}”. This is a temporary local demo response in Hitesh's teaching style.`;
  }

  return `Absolutely. You asked: “${question}”. This is a temporary local demo response in Piyush's teaching style.`;
}

export default function ChatWindow({
  selectedPersona,
  onPersonaChange,
  isDark,
}: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function handlePersonaChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextPersona = event.target.value;

    if (nextPersona === "hitesh" || nextPersona === "piyush") {
      onPersonaChange(nextPersona);
    }
  }

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
      content: getTemporaryAssistantResponse(selectedPersona, trimmedInput),
    };

    setMessages((currentMessages) => [
      ...currentMessages,
      userMessage,
      assistantMessage,
    ]);

    setInputValue("");
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-center">
            <div className="max-w-lg -translate-y-6">
              <div
                className={
                  isDark
                    ? "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-xl text-cyan-300"
                    : "mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-100 text-xl text-cyan-700"
                }
              >
                <span aria-hidden="true">✦</span>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                What can {getPersonaName(selectedPersona)} help you learn?
              </h2>
              <p
                className={
                  isDark
                    ? "mt-3 text-sm leading-6 text-slate-400 sm:text-base"
                    : "mt-3 text-sm leading-6 text-slate-600 sm:text-base"
                }
              >
                Ask about JavaScript, system design, coding projects, or any
                concept you want explained clearly.
              </p>
            </div>
          </div>
        ) : (
          <div
            aria-live="polite"
            className="mx-auto w-full max-w-3xl space-y-6"
          >
            {messages.map((message) => {
              const isUser = message.role === "user";

              return (
                <div
                  key={message.id}
                  className={isUser ? "flex justify-end" : "flex justify-start"}
                >
                  <div className="max-w-[88%] sm:max-w-[78%]">
                    {!isUser && (
                      <p
                        className={
                          isDark
                            ? "mb-2 px-1 text-xs font-semibold text-cyan-400"
                            : "mb-2 px-1 text-xs font-semibold text-cyan-700"
                        }
                      >
                        {getPersonaName(message.persona)}
                      </p>
                    )}

                    <div
                      className={
                        isUser
                          ? "rounded-3xl rounded-br-md bg-cyan-600 px-4 py-3 text-sm text-white shadow-sm sm:text-base"
                          : isDark
                            ? "rounded-3xl rounded-bl-md border border-slate-800 bg-slate-900 px-4 py-3 text-sm text-slate-100 shadow-sm sm:text-base"
                            : "rounded-3xl rounded-bl-md border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 shadow-sm sm:text-base"
                      }
                    >
                      <p className="whitespace-pre-wrap leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div
        className={
          isDark
            ? "shrink-0 border-t border-slate-800 bg-slate-950/95 px-3 pb-3 pt-3 backdrop-blur sm:px-6 sm:pb-4"
            : "shrink-0 border-t border-slate-200 bg-slate-50/95 px-3 pb-3 pt-3 backdrop-blur sm:px-6 sm:pb-4"
        }
      >
        <form
          onSubmit={handleSubmit}
          className={
            isDark
              ? "mx-auto w-full max-w-3xl rounded-3xl border border-slate-700 bg-slate-900 p-2 shadow-2xl shadow-black/20 transition focus-within:border-cyan-500"
              : "mx-auto w-full max-w-3xl rounded-3xl border border-slate-300 bg-white p-2 shadow-lg shadow-slate-300/40 transition focus-within:border-cyan-600"
          }
        >
          <div className="flex items-center gap-2 px-2 pb-1 pt-1">
            <label
              htmlFor="persona-select"
              className="text-xs font-medium text-slate-500"
            >
              Persona
            </label>
            <select
              id="persona-select"
              value={selectedPersona}
              onChange={handlePersonaChange}
              className={
                isDark
                  ? "rounded-lg border border-slate-700 bg-slate-800 px-2 py-1 text-xs font-medium text-slate-200 outline-none focus:border-cyan-500"
                  : "rounded-lg border border-slate-200 bg-slate-100 px-2 py-1 text-xs font-medium text-slate-700 outline-none focus:border-cyan-600"
              }
            >
              {personas.map((persona) => (
                <option key={persona.id} value={persona.id}>
                  {persona.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
              placeholder={`Ask ${getPersonaName(selectedPersona)} anything...`}
              aria-label="Chat message"
              className={
                isDark
                  ? "min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-white outline-none placeholder:text-slate-500 sm:text-base"
                  : "min-w-0 flex-1 bg-transparent px-3 py-3 text-sm text-slate-950 outline-none placeholder:text-slate-400 sm:text-base"
              }
            />

            <button
              type="submit"
              disabled={!inputValue.trim()}
              className={
                isDark
                  ? "shrink-0 rounded-full bg-cyan-400 px-4 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500"
                  : "shrink-0 rounded-full bg-cyan-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"
              }
            >
              Send
            </button>
          </div>
        </form>

        <p
          className={
            isDark
              ? "mx-auto mt-2 max-w-3xl px-2 text-center text-[10px] leading-4 text-slate-600 sm:text-xs"
              : "mx-auto mt-2 max-w-3xl px-2 text-center text-[10px] leading-4 text-slate-400 sm:text-xs"
          }
        >
          AI-generated educational simulation inspired by publicly available
          teaching styles. This is not the real person.
        </p>
      </div>
    </div>
  );
}
