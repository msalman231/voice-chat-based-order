import { create } from "zustand";

interface State {
  audioUrl: string | null;
  setAudioUrl: (url: string) => void;
}

export const useVoiceStore = create<State>((set) => ({
  audioUrl: null,

  setAudioUrl: (url) =>
    set({
      audioUrl: url,
    }),
}));
