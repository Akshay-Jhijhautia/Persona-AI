export type PersonaId = "hitesh" | "piyush";

export type ChatRole = "user" | "assistant";

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
