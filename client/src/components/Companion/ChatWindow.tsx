import { useState, useRef, useEffect } from "react";
import { Send, X, Bot, Sparkles } from "lucide-react";
import { Button } from "../ui/button";

interface ChatWindowProps {
    onClose: () => void;
    avatarSrc: string;
    name: string;
}

interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function ChatWindow({ onClose, avatarSrc, name }: ChatWindowProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: `Hi there! I'm ${name}. How are you feeling right now?`,
        },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = { role: "user", content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Mock AI response for now
        setTimeout(() => {
            const responses = [
                "I hear you. Tell me more about that.",
                "That sounds important. How does that make you feel?",
                "I'm here for you. We can work through this together.",
                "Remember to take deep breaths. You're doing great.",
                "It's okay to feel this way. Let's explore that emotion.",
            ];
            const randomResponse =
                responses[Math.floor(Math.random() * responses.length)];

            const aiMessage: Message = { role: "assistant", content: randomResponse };
            setMessages((prev) => [...prev, aiMessage]);
            setIsLoading(false);
        }, 1000);
    };

    return (
        <div className="absolute bottom-24 right-0 w-80 md:w-96 h-[500px] bg-card/95 backdrop-blur-md border border-border/50 shadow-2xl rounded-3xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 zoom-in-95 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-border/50 bg-primary/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-background border border-border p-1">
                        <img
                            src={avatarSrc}
                            alt="Companion"
                            className="w-full h-full object-contain"
                        />
                    </div>
                    <div>
                        <h3 className="font-semibold text-sm">{name}</h3>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            <span className="text-xs text-muted-foreground">Always here</span>
                        </div>
                    </div>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClose}
                    className="rounded-full hover:bg-background/50 h-8 w-8"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"
                            }`}
                    >
                        <div
                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.role === "user"
                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                    : "bg-muted text-foreground rounded-tl-none"
                                }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="bg-muted text-foreground rounded-2xl rounded-tl-none p-3 flex gap-1">
                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce delay-100" />
                            <span className="w-1.5 h-1.5 bg-foreground/30 rounded-full animate-bounce delay-200" />
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border/50 bg-background/50">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSend();
                    }}
                    className="flex gap-2"
                >
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 bg-background border border-border rounded-full px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                    <Button
                        type="submit"
                        size="icon"
                        disabled={!input.trim() || isLoading}
                        className="rounded-full w-10 h-10 shrink-0"
                    >
                        <Send className="w-4 h-4 ml-0.5" />
                    </Button>
                </form>
            </div>
        </div>
    );
}
