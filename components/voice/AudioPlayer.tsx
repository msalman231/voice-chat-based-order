"use client"

import { useVoiceStore } from "@/store/voice.store"

export default function AudioPlayer() {
    const audioUrl = useVoiceStore(
        (s) => s.audioUrl
    )

    if (!audioUrl) return null

    return (<audio
        controls
        src={audioUrl}
        className="mt-4"
    />
    )
}
