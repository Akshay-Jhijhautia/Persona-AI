"use client";

import { useState } from "react";
import ChatWindow from "./ChatWindow";
import type { PersonaId } from "../types/chat";

type Theme = "light" | "dark";

export default function HomeShell() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>("hitesh");

  function toggleTheme() {
    setTheme((currentTheme) =>
      currentTheme === "dark" ? "light" : "dark",
    );
  }

  const isDark = theme === "dark";

  return (
    <main
      className={
        isDark
          ? "flex h-dvh flex-col overflow-hidden bg-slate-950 text-slate-100 transition-colors"
          : "flex h-dvh flex-col overflow-hidden bg-slate-50 text-slate-950 transition-colors"
      }
    >
      <header
        className={
          isDark
            ? "shrink-0 border-b border-slate-800 bg-slate-950/95"
            : "shrink-0 border-b border-slate-200 bg-white/95"
        }
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <div>
            <h1 className="text-base font-semibold tracking-tight sm:text-lg">
              Persona AI
            </h1>
            <p className="text-xs text-slate-500">
              Learn with a teaching persona
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
            className={
              isDark
                ? "flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-200 transition hover:border-slate-600 hover:bg-slate-800"
                : "flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-100"
            }
          >
            <span aria-hidden="true">{isDark ? "☀" : "☾"}</span>
            <span className="hidden sm:inline">
              {isDark ? "Light" : "Dark"} theme
            </span>
          </button>
        </div>
      </header>

      <section className="min-h-0 flex-1">
        <ChatWindow
          selectedPersona={selectedPersona}
          onPersonaChange={setSelectedPersona}
          isDark={isDark}
        />
      </section>
    </main>
  );
}
