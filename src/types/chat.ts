export type PersonaId = "hitesh" | "piyush";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  persona?: PersonaId;
};