"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function HomeShell() {
  const [theme, setTheme] = useState<Theme>("dark");

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
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
        <header className="mb-8 flex items-start justify-between gap-6">
          <div>
            <p
              className={
                isDark
                  ? "mb-2 text-sm font-medium text-cyan-400"
                  : "mb-2 text-sm font-medium text-cyan-700"
              }
            >
              AI Persona Chat
            </p>

            <h1 className="text-4xl font-bold tracking-tight">
              Learn with AI personas inspired by Hitesh Choudhary and Piyush
              Garg
            </h1>

            <p
              className={
                isDark
                  ? "mt-4 max-w-2xl text-slate-300"
                  : "mt-4 max-w-2xl text-slate-600"
              }
            >
              Select a teaching persona, ask a question, and get a step-by-step
              explanation in a natural conversational style.
            </p>
          </div>

          <button
            type="button"
            onClick={toggleTheme}
            className={
              isDark
                ? "rounded-full border border-slate-700 bg-slate-900 px-4 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800"
                : "rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            }
          >
            {isDark ? "Light mode" : "Dark mode"}
          </button>
        </header>

        <section
          className={
            isDark
              ? "flex flex-1 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8"
              : "flex flex-1 items-center justify-center rounded-2xl border border-slate-300 bg-white p-8"
          }
        >
          <p className={isDark ? "text-slate-400" : "text-slate-500"}>
            Chat interface will be built here in the next step.
          </p>
        </section>

        <footer
          className={
            isDark
              ? "mt-6 text-center text-xs text-slate-500"
              : "mt-6 text-center text-xs text-slate-500"
          }
        >
          AI-generated educational simulation inspired by publicly available
          teaching styles. This is not the real person.
        </footer>
      </section>
    </main>
  );
}
