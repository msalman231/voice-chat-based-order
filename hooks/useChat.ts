"use client";

import { v4 as uuidv4 } from "uuid";

import { useChatStore } from "@/store/chat.store";

import { ChatResponse } from "@/types/chat.types";

export function useChat() {
  const { messages, addMessage, isTyping, setTyping } = useChatStore();

  async function sendMessage(text: string) {
    const userMessage = {
      id: uuidv4(),
      role: "user" as const,
      content: text,
      createdAt: Date.now(),
    };

    addMessage(userMessage);

    setTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: text,
        }),
      });

      const data: ChatResponse = await res.json();

      const assistantMessage = {
        id: uuidv4(),
        role: "assistant" as const,
        content: data.response,
        createdAt: Date.now(),
      };

      addMessage(assistantMessage);
    } catch (error) {
      console.error("CHAT ERROR:", error);
    }

    setTyping(false);
  }

  return {
    messages,
    isTyping,
    sendMessage,
  };
}
