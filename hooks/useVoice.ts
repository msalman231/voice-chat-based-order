"use client";

import { useState } from "react";
import { useVoiceStore } from "@/store/voice.store";

export function useVoice() {
  const [isRecording, setRecording] = useState(false);

  const setAudioUrl = useVoiceStore((s) => s.setAudioUrl);

  let mediaRecorder: MediaRecorder | null = null;

  async function startRecording() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder = new MediaRecorder(stream);

    const chunks: Blob[] = [];

    mediaRecorder.ondataavailable = (e) => {
      chunks.push(e.data);
    };

    mediaRecorder.onstop = async () => {
      const blob = new Blob(chunks);

      const formData = new FormData();

      formData.append("audio", blob);

      const res = await fetch("/api/voice/speech-to-text", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      console.log("Transcript:", data.text);
    };

    mediaRecorder.start();

    setRecording(true);
  }

  function stopRecording() {
    mediaRecorder?.stop();
    setRecording(false);
  }

  return {
    isRecording,
    startRecording,
    stopRecording,
    setAudioUrl,
  };
}
