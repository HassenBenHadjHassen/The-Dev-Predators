import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CompanionContextType {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    message: string | null;
    setMessage: (message: string | null) => void;
    emotion: string | null;
    setEmotion: (emotion: string | null) => void;
    triggerCheer: () => void;
    triggerCheckIn: () => void;
    refreshKey: number;
    triggerRefresh: () => void;
}

const CompanionContext = createContext<CompanionContextType | undefined>(undefined);

export const CompanionProvider = ({ children }: { children: ReactNode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [emotion, setEmotion] = useState<string | null>(null);

    const [refreshKey, setRefreshKey] = useState(0);

    const triggerCheer = () => {
        setMessage("Great job! You're doing amazing! 🎉");
        setTimeout(() => setMessage(null), 5000); // Hide after 5 seconds
    };

    const triggerCheckIn = () => {
        setMessage("How are you feeling right now?");
        setTimeout(() => setMessage(null), 8000);
    };

    const triggerRefresh = () => {
        setRefreshKey(prev => prev + 1);
    };

    return (
        <CompanionContext.Provider
            value={{
                isOpen,
                setIsOpen,
                message,
                setMessage,
                emotion,
                setEmotion,
                triggerCheer,
                triggerCheckIn,
                refreshKey,
                triggerRefresh
            }}
        >
            {children}
        </CompanionContext.Provider>
    );
};

export const useCompanion = () => {
    const context = useContext(CompanionContext);
    if (context === undefined) {
        throw new Error("useCompanion must be used within a CompanionProvider");
    }
    return context;
};
