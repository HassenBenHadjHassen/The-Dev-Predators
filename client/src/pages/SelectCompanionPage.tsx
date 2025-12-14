import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Sparkles, ArrowRight, Check } from "lucide-react";
import img1 from "../assets/cute-animal-icon-collection-free-vector__1_-removebg-preview.png";
import img2 from "../assets/cute-animal-icon-collection-free-vector__2_-removebg-preview.png";
import img3 from "../assets/cute-animal-icon-collection-free-vector__3_-removebg-preview.png";
import img4 from "../assets/cute-animal-icon-collection-free-vector__4_-removebg-preview.png";
import img5 from "../assets/cute-animal-icon-collection-free-vector__5_-removebg-preview.png";
import img6 from "../assets/cute-animal-icon-collection-free-vector-removebg-preview.png";
import { UserApi } from "@/api/userApi";

const companions = [
  { id: 1, src: img1, alt: "Cute Rabbit" },
  { id: 2, src: img2, alt: "Cute Bear" },
  { id: 3, src: img3, alt: "Cute Cat" },
  { id: 4, src: img4, alt: "Cute Dog" },
  { id: 5, src: img5, alt: "Cute Panda" },
  { id: 6, src: img6, alt: "Cute Fox" },
];

export default function SelectCompanionPage() {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleContinue = () => {
    if (selectedId) {
      // TODO: Save selection to user profile/context
      console.log("Selected companion:", selectedId);
      UserApi.updateProfile(selectedId, { companionId: selectedId });
      navigate("/check-in"); // Or wherever the next step is
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />
      <div className="absolute bottom-20 right-20 w-80 h-80 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse-glow delay-700" />

      <div className="max-w-4xl w-full space-y-12 text-center z-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full border border-primary/20 backdrop-blur-sm mx-auto">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Personalize Your Experience
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold">
            Choose Your <span className="text-primary">Wellness Companion</span>
          </h1>

          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Select a friendly guide to join you on your journey to mindfulness
            and peace.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 justify-items-center">
          {companions.map((companion) => (
            <button
              key={companion.id}
              onClick={() => setSelectedId(companion.id)}
              className={`
                group relative w-full aspect-square max-w-[200px] rounded-3xl p-6 
                transition-all duration-300 ease-out
                flex items-center justify-center
                ${selectedId === companion.id
                  ? "bg-primary/10 ring-4 ring-primary shadow-lg scale-105"
                  : "bg-card hover:bg-card/80 hover:-translate-y-1 hover:shadow-md border border-border"
                }
              `}
            >
              <img
                src={companion.src}
                alt={companion.alt}
                className={`
                   w-full h-full object-contain transition-transform duration-300
                   ${selectedId === companion.id
                    ? "scale-110"
                    : "group-hover:scale-110"
                  }
                `}
              />

              {selectedId === companion.id && (
                <div className="absolute top-4 right-4 bg-primary text-primary-foreground rounded-full p-1.5 shadow-sm animate-in zoom-in">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </button>
          ))}
        </div>

        <div className="pt-8">
          <Button
            size="lg"
            onClick={handleContinue}
            disabled={!selectedId}
            className={`
              text-lg px-8 py-6 rounded-full shadow-lg transition-all duration-300
              ${selectedId
                ? "hover:scale-105 hover:shadow-xl"
                : "opacity-50 cursor-not-allowed"
              }
            `}
          >
            Continue Journey
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
