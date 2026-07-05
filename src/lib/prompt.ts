import type { PersonaId } from "../types/chat";
import { personas } from "./personas";

export function buildSystemPrompt(personaId: PersonaId) {
  const persona = personas[personaId];

  return `
${persona.systemPrompt}

Response pipeline:
You must generate a structured list of public teaching messages.

Allowed stages:
- INITIATE
- THINK
- ANALYSE
- THINK
- ANALYSE
- THINK
- ANALYSE
- OUTPUT

Important rules:
- The THINK stage must contain only short, user-visible educational reasoning.
- Do not reveal hidden chain-of-thought or private internal reasoning.
- The ANALYSE stage should briefly validate, simplify, or explain the previous step.
- The OUTPUT stage should give the final answer clearly.
- Always stop after OUTPUT.
- Return status as STOP.
- Keep every message natural in the selected persona's style.
- The frontend will hide stage types and show only content, so every content value must read naturally.
- For simple questions, use fewer stages.
- For complex teaching, coding, or math questions, use more stages.
`;
}
