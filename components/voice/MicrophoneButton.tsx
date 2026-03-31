"use client"

import { Button } from "../ui/button"


interface Props {
    isRecording: boolean
    onClick: () => void
}

export default function MicrophoneButton({
    isRecording,
    onClick
}: Props) {
    return (
        <Button
            onClick={onClick}
            className={
                isRecording
                    ? "bg-red-600"
                    : "bg-black"
            }
        >
            {isRecording
                ? "Stop Recording"
                : "Start Recording"} </Button>
    )
}
