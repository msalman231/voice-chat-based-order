"use client"

import {
    useState,
    KeyboardEvent,
} from "react"

interface Props {
    onSend: (
        message: string
    ) => void
}

export default function ChatInput({
    onSend,
}: Props) {
    const [message, setMessage] =
        useState("")

    const send = () => {
        if (!message.trim()) return

        onSend(message)

        setMessage("")
    }

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            send()
        }
    }

    return (
        <div
            style={{
                display: "flex",
                padding: 16,
                borderTop: "1px solid #1e293b",
            }}
        >
            <input
                value={message}
                onChange={(e) =>
                    setMessage(e.target.value)
                }
                onKeyDown={handleKeyDown}
                placeholder="Type your message..."
                style={{
                    flex: 1,
                    padding: 10,
                    borderRadius: 8,
                    border: "none",
                    outline: "none",
                }}
            />

            <button
                onClick={send}
                style={{
                    marginLeft: 10,
                    padding: "10px 16px",
                    background: "#2563eb",
                    color: "white",
                    borderRadius: 8,
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Send
            </button>
        </div>
    )
}