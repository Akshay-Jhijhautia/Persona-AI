import type { PersonaId } from "../types/chat";

type PersonaSelectorProps = {
  selectedPersona: PersonaId;
  onPersonaChange: (persona: PersonaId) => void;
  isDark: boolean;
};

const personas: {
  id: PersonaId;
  name: string;
  description: string;
}[] = [
  {
    id: "hitesh",
    name: "Hitesh Choudhary",
    description: "Friendly Hinglish mentor-style explanations.",
  },
  {
    id: "piyush",
    name: "Piyush Garg",
    description: "Professional Hinglish engineering-focused explanations.",
  },
];

export default function PersonaSelector({
  selectedPersona,
  onPersonaChange,
  isDark,
}: PersonaSelectorProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {personas.map((persona) => {
        const isSelected = selectedPersona === persona.id;

        return (
          <button
            key={persona.id}
            type="button"
            onClick={() => onPersonaChange(persona.id)}
            className={
              isDark
                ? `rounded-2xl border p-5 text-left transition ${
                    isSelected
                      ? "border-cyan-400 bg-cyan-400/10"
                      : "border-slate-800 bg-slate-900 hover:border-slate-600"
                  }`
                : `rounded-2xl border p-5 text-left transition ${
                    isSelected
                      ? "border-cyan-600 bg-cyan-50"
                      : "border-slate-300 bg-white hover:border-slate-400"
                  }`
            }
          >
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-lg font-semibold">{persona.name}</h2>

              {isSelected && (
                <span
                  className={
                    isDark
                      ? "rounded-full bg-cyan-400 px-3 py-1 text-xs font-semibold text-slate-950"
                      : "rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white"
                  }
                >
                  Selected
                </span>
              )}
            </div>

            <p
              className={
                isDark
                  ? "mt-2 text-sm text-slate-400"
                  : "mt-2 text-sm text-slate-600"
              }
            >
              {persona.description}
            </p>
          </button>
        );
      })}
    </div>
  );
}
