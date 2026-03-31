export type Role = "user" | "assistant";

export interface ChatMessageType {
  id: string;
  role: Role;
  content: string;
  createdAt: number;
}

export interface ChatResponse {
  success: boolean;
  response: string;
}
