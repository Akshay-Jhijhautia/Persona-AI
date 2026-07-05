export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col px-6 py-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-medium text-cyan-400">
            AI Persona Chat
          </p>

          <h1 className="text-4xl font-bold tracking-tight">
            Learn with AI personas inspired by Hitesh Choudhary and Piyush Garg
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300">
            Select a teaching persona, ask a question, and get a step-by-step
            explanation in a natural conversational style.
          </p>
        </header>

        <section className="flex flex-1 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900/60 p-8">
          <p className="text-slate-400">
            Chat interface will be built here in the next step.
          </p>
        </section>

        <footer className="mt-6 text-center text-xs text-slate-500">
          AI-generated educational simulation inspired by publicly available
          teaching styles. This is not the real person.
        </footer>
      </section>
    </main>
  );
}
