import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCompanion } from "@/context/CompanionContext";
import { UserApi } from "@/api/userApi";
import ChatWindow from "./ChatWindow";
import { COMPANIONS } from "../../constants/companions";

export default function FloatingCompanion() {
    const { isOpen, setIsOpen, message } = useCompanion();
    const [user, setUser] = useState<any>(null);
    const location = useLocation();

    const isPublicRoute = ["/", "/login", "/signup"].includes(location.pathname);

    useEffect(() => {
        if (isPublicRoute) return;

        const fetchUser = async () => {
            try {
                const response = await UserApi.getUser();
                if (response.success) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Failed to fetch user for companion:", error);
            }
        };
        fetchUser();
    }, [location, isPublicRoute]);

    if (isPublicRoute) return null;

    const companion = COMPANIONS.find((c) => c.id === user?.selectedCompanionId);
    if (!companion && !user) return null; // Don't show if loading or no user? Or show default?

    // Show default if user exists but no companion selected (or loading finished)
    const avatarSrc = companion?.src || "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";
    const name = companion?.alt || "Companion";

    // Handle initial open check? Context handles it.

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end pointer-events-none">
            {/* Bubble Message */}
            {message && (
                <div className="mb-4 mr-2 bg-background border border-border p-3 rounded-2xl rounded-br-none shadow-lg animate-in fade-in slide-in-from-bottom-2 max-w-[200px] text-sm pointer-events-auto">
                    {message}
                </div>
            )}

            <div className="pointer-events-auto relative">
                {isOpen && (
                    <div className="absolute bottom-0 right-0">
                        <ChatWindow
                            onClose={() => setIsOpen(false)}
                            avatarSrc={avatarSrc}
                            name={name}
                        />
                    </div>

                )}

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
          group relative w-16 h-16 md:w-20 md:h-20 rounded-full 
          bg-background/80 backdrop-blur-sm border-2 border-primary/20 shadow-2xl 
          flex items-center justify-center transition-all duration-300
          hover:scale-110 hover:border-primary
          ${isOpen ? "scale-90 opacity-0 pointer-events-none" : ""} 
        `}
                >
                    {/* Pulse Effect */}
                    <span className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-75 duration-3000" />

                    {/* Avatar */}
                    <div className="w-full h-full p-2 relative z-10">
                        <img
                            src={avatarSrc}
                            alt={name}
                            className="w-full h-full object-contain mb-1"
                        />
                    </div>

                    {/* Badge */}
                    <div className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm animate-bounce">
                        Chat
                    </div>
                </button>
            </div>

        </div>
    );
}
