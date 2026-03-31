"use client"

import ChatWindow from "@/components/chat/ChatWindow"

export default function ChatPage() {
    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
            }}
        >
            <ChatWindow />
        </div>
    )
}