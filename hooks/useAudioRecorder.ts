"use client";

export function useAudioRecorder() {
  async function record() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    return stream;
  }

  return {
    record,
  };
}
