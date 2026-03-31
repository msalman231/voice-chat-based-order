"use client"

import MicrophoneButton from "./MicrophoneButton"
import VoiceVisualizer from "./VoiceVisualizer"
import { useVoice } from "@/hooks/useVoice"

export default function VoiceRecorder() {
    const {
        isRecording,
        startRecording,
        stopRecording
    } = useVoice()

    return (<div className="flex flex-col items-center gap-4">
        <MicrophoneButton
            isRecording={isRecording}
            onClick={
                isRecording
                    ? stopRecording
                    : startRecording
            }
        />

        {isRecording && (
            <VoiceVisualizer />
        )}
    </div>


    )
}
