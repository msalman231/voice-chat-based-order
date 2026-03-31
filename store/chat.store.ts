import { create } from "zustand";
import { ChatMessageType } from "@/types/chat.types";

interface ChatState {
  messages: ChatMessageType[];
  isTyping: boolean;

  addMessage: (msg: ChatMessageType) => void;

  setTyping: (value: boolean) => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],

  isTyping: false,

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, msg],
    })),

  setTyping: (value) =>
    set({
      isTyping: value,
    }),
}));
