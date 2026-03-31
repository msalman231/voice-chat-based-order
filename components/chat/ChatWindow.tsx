"use client"

import { useChat } from "@/hooks/useChat"
import ChatMessage from "./ChatMessage"
import ChatInput from "./ChatInput"
import TypingIndicator from "./TypingIndicator"

export default function ChatWindow() {
    const {
        messages,
        isTyping,
        sendMessage,
    } = useChat()

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            {/* MESSAGE LIST */}

            <div
                style={{
                    flex: 1,
                    overflowY: "auto",
                    padding: 16,
                }}
            >
                {messages.map((msg) => (
                    <ChatMessage
                        key={msg.id}
                        message={msg}
                    />
                ))}

                {isTyping && <TypingIndicator />}
            </div>

            {/* INPUT */}

            <ChatInput
                onSend={sendMessage}
            />
        </div>
    )
}