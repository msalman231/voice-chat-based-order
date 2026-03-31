export interface ChatPayload {
  message: string;
  sessionId: string;
}

export interface ChatResponse {
  reply: string;
  intent?: string;
  data?: unknown;
}

export async function sendToN8n(payload: ChatPayload): Promise<ChatResponse> {
  const url = process.env.N8N_WEBHOOK_URL;

  if (!url) {
    throw new Error("N8N_WEBHOOK_URL missing");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("n8n request failed");
  }

  return response.json();
}
