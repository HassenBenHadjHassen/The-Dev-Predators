import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useLocation } from "react-router-dom";
import img1 from "../../assets/cute-animal-icon-collection-free-vector__1_-removebg-preview.png";
import img2 from "../../assets/cute-animal-icon-collection-free-vector__2_-removebg-preview.png";
import img3 from "../../assets/cute-animal-icon-collection-free-vector__3_-removebg-preview.png";
import img4 from "../../assets/cute-animal-icon-collection-free-vector__4_-removebg-preview.png";
import img5 from "../../assets/cute-animal-icon-collection-free-vector__5_-removebg-preview.png";
import img6 from "../../assets/cute-animal-icon-collection-free-vector-removebg-preview.png";

const companionImages: Record<number, string> = {
  1: img1,
  2: img2,
  3: img3,
  4: img4,
  5: img5,
  6: img6,
};

export default function CompanionAvatar() {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const location = useLocation();
  const companionId = localStorage.getItem("companionId");

  useEffect(() => {
    // Fade in effect on mount
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Periodic check-in message
    const interval = setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance every interval
        setMessage("How are you feeling right now?");
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!companionId) return null;

  const imgSrc = companionImages[parseInt(companionId)];
  if (!imgSrc) return null;

  // Don't show on select-companion page or before signup (handled by layout logic mostly, but good check)
  if (
    location.pathname === "/select-companion" ||
    location.pathname === "/login" ||
    location.pathname === "/signup" ||
    location.pathname === "/"
  ) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex items-end gap-2 pointer-events-none transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Message Bubble */}
      {message && (
        <div className="mb-8 mr-2 bg-card border border-border/50 shadow-xl rounded-2xl rounded-br-sm p-4 animate-in slide-in-from-right-4 fade-in max-w-[200px] relative pointer-events-auto">
          {/* Tail */}
          <div className="absolute -right-2 bottom-4 w-4 h-4 bg-card border-r border-b border-border/50 transform rotate-45" />

          <button
            onClick={() => setMessage(null)}
            className="absolute -top-2 -left-2 bg-muted hover:bg-muted/80 rounded-full p-1 transition-colors z-10"
          >
            <X className="w-3 h-3 text-muted-foreground" />
          </button>
          <p className="text-sm font-medium text-foreground relative z-10">
            {message}
          </p>
        </div>
      )}

      {/* Avatar */}
      <div className="relative group pointer-events-auto cursor-pointer">
        <div
          className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/30 transition-all duration-500 animate-pulse-glow"
          style={{ animationDuration: "4s" }}
        />
        <img
          src={imgSrc}
          alt="Companion"
          className="w-32 h-32 object-contain relative transition-transform duration-300 hover:scale-110 hover:-rotate-6 drop-shadow-lg"
          onClick={() => setMessage(message ? null : "I'm here for you!")}
        />
      </div>
    </div>
  );
}
