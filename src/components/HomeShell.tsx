"use client";

import { useEffect, useState } from "react";
import PersonaSelector from "./PersonaSelector";
import type { PersonaId } from "../types/chat";

type Theme = "light" | "dark";

export default function HomeShell() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [selectedPersona, setSelectedPersona] = useState<PersonaId>("hitesh");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light" || savedTheme === "dark") {
      setTheme(savedTheme);
    }
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";

    setTheme(nextTheme);
    localStorage.setItem("theme", nextTheme);
  }

  const isDark = theme === "dark";

  return (
    <main
      className={
        isDark
          ? "min-h-screen bg-slate-950 text-white"
          : "min-h-screen bg-slate-100 text-slate-950"
      }
    >
      <section
        className={
          isDark
            ? "flex flex-1 flex-col gap-6 rounded-2xl border border-slate-800 bg-slate-900/60 p-6"
            : "flex flex-1 flex-col gap-6 rounded-2xl border border-slate-300 bg-white p-6"
        }
      >
        <div>
          <h2 className="text-xl font-semibold">
            Choose your teaching persona
          </h2>
          <p
            className={
              isDark
                ? "mt-1 text-sm text-slate-400"
                : "mt-1 text-sm text-slate-600"
            }
          >
            Select who should explain the concept to you.
          </p>
        </div>

        <PersonaSelector
          selectedPersona={selectedPersona}
          onPersonaChange={setSelectedPersona}
          isDark={isDark}
        />

        <div
          className={
            isDark
              ? "rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-400"
              : "rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600"
          }
        >
          Current persona:{" "}
          <span className="font-semibold">
            {selectedPersona === "hitesh" ? "Hitesh Choudhary" : "Piyush Garg"}
          </span>
        </div>
      </section>
    </main>
  );
}
