export async function callLLM(prompt: string) {
  try {
    const baseUrl = process.env.OLLAMA_URL || "http://localhost:11434";

    console.log("Using Ollama URL:", baseUrl);

    const controller = new AbortController();

    // Increase timeout to 90 seconds

    const timeout = setTimeout(() => controller.abort(), 90000);

    const res = await fetch(`${baseUrl}/api/generate`, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        model: process.env.OLLAMA_MODEL || "llama3.2",

        prompt,

        stream: false,

        options: {
          temperature: 0.2,

          // CRITICAL — limit output length
          num_predict: 60,

          // faster decoding
          top_k: 20,
        },
      }),

      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) throw new Error(`Ollama HTTP ${res.status}`);

    const data = await res.json();

    return data.response || "Sorry, I couldn't respond.";
  } catch (error) {
    console.error("OLLAMA ERROR:", error);

    return "Sorry, the assistant is busy right now.";
  }
}
