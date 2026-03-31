import { ChatMessageType } from "@/types/chat.types"

interface Props {
    message: ChatMessageType
}

export default function ChatMessage({
    message,
}: Props) {
    const isUser =
        message.role === "user"

    return (
        <div
            style={{
                display: "flex",
                justifyContent: isUser
                    ? "flex-end"
                    : "flex-start",
                marginBottom: 12,
            }}
        >
            <div
                style={{
                    padding: "10px 14px",
                    borderRadius: 12,
                    maxWidth: "70%",
                    background: isUser
                        ? "#2563eb"
                        : "#1e293b",
                }}
            >
                {message.content}
            </div>
        </div>
    )
}