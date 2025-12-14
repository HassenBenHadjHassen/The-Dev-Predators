import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  ArrowRight,
  Activity,
  Heart,
  Briefcase,
  User,
  Calendar,
  Smile,
  Zap,
  Target,
} from "lucide-react";
import { CheckInApi } from "@/api/checkInApi";

const intensityLevels = [1, 2, 3, 4, 5];
const situations = [
  { id: "work", label: "Work & Career", icon: Briefcase },
  { id: "relationships", label: "Relationships", icon: Heart },
  { id: "self-esteem", label: "Self-Esteem", icon: User },
  { id: "future", label: "Future & Goals", icon: Target },
  { id: "health", label: "Health & Body", icon: Activity },
];
const goals = [
  { id: "reframe", label: "Reframe Thoughts", icon: Zap },
  { id: "calm", label: "Find Calm", icon: Smile },
  { id: "perspective", label: "Gain Perspective", icon: Activity },
  { id: "validate", label: "Feel Validated", icon: Heart },
];

export default function CheckInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    age: "",
    emotionalState: "",
    intensityLevel: 3,
    situation: "",
    goal: "",
  });

  const handleIntensityChange = (level: number) => {
    setFormData({ ...formData, intensityLevel: level });
  };

  const handleSubmit = () => {
    CheckInApi.createCheckIn(formData);
    navigate("/chat"); // Navigate to chat after check-in
  };

  const isFormValid =
    formData.age && formData.emotionalState && formData.situation && formData.goal;

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse-glow" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10 animate-pulse-glow delay-1000" />

      <div className="max-w-2xl w-full bg-card/60 backdrop-blur-md border border-border/50 shadow-xl rounded-[2rem] p-8 md:p-12 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="space-y-2 text-center">
          <h1 className="font-serif text-3xl md:text-4xl font-bold">
            Daily Check-In
          </h1>
          <p className="text-muted-foreground">
            Tell us a little about how you're feeling right now.
          </p>
        </div>

        <div className="space-y-8">
          {/* Row 1: Age & Emotion */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Age
              </label>
              <input
                type="number"
                placeholder="25"
                value={formData.age}
                onChange={(e) =>
                  setFormData({ ...formData, age: e.target.value })
                }
                className="w-full bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 outline-none transition-all placeholder:text-muted-foreground/50"
              />
            </div>
            <div className="md:col-span-2 space-y-3">
              <label className="text-sm font-medium text-muted-foreground ml-1 flex items-center gap-2">
                <Smile className="w-4 h-4" /> Current Emotional State
              </label>
              <input
                type="text"
                placeholder="e.g., Anxious, Overwhelmed, Excited..."
                value={formData.emotionalState}
                onChange={(e) =>
                  setFormData({ ...formData, emotionalState: e.target.value })
                }
                className="w-full bg-background/50 border border-border focus:border-primary focus:ring-4 focus:ring-primary/10 rounded-2xl px-4 py-3 outline-none transition-all placeholder:text-muted-foreground/50"
              />
            </div>
          </div>

          {/* Intensity */}
          <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
              <label className="text-sm font-medium text-muted-foreground">
                Intensity Level
              </label>
              <span className="text-sm font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {formData.intensityLevel}/5
              </span>
            </div>
            <div className="flex justify-between gap-4">
              {intensityLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => handleIntensityChange(level)}
                  className={`
                    flex-1 aspect-square rounded-2xl flex items-center justify-center text-lg font-medium transition-all duration-300
                    ${formData.intensityLevel === level
                      ? "bg-primary text-primary-foreground shadow-lg scale-110"
                      : "bg-background/50 hover:bg-primary/20 hover:scale-105 border border-border"
                    }
                  `}
                >
                  {level}
                </button>
              ))}
            </div>
            <div className="flex justify-between text-xs text-muted-foreground px-2">
              <span>Low</span>
              <span>High</span>
            </div>
          </div>

          {/* Situation */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground ml-1">
              What's on your mind?
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {situations.map((sit) => (
                <button
                  key={sit.id}
                  onClick={() =>
                    setFormData({ ...formData, situation: sit.id })
                  }
                  className={`
                    flex flex-col items-center justify-center p-4 gap-2 rounded-2xl border transition-all duration-200
                    ${formData.situation === sit.id
                      ? "bg-primary/5 border-primary text-primary ring-1 ring-primary"
                      : "bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                    }
                  `}
                >
                  <sit.icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{sit.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Goal */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-muted-foreground ml-1">
              What do you need right now?
            </label>
            <div className="grid grid-cols-2 gap-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setFormData({ ...formData, goal: g.id })}
                  className={`
                     flex items-center gap-3 p-4 rounded-2xl border transition-all duration-200
                     ${formData.goal === g.id
                      ? "bg-primary/5 border-primary text-primary ring-1 ring-primary"
                      : "bg-background/50 border-border text-muted-foreground hover:border-primary/50 hover:bg-primary/5"
                    }
                   `}
                >
                  <div
                    className={`p-2 rounded-xl ${formData.goal === g.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                      }`}
                  >
                    <g.icon className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-medium">{g.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-4">
          <Button
            size="lg"
            className={`w-full text-lg py-6 rounded-2xl shadow-lg transition-all
              ${isFormValid
                ? "hover:scale-[1.02] hover:shadow-xl"
                : "opacity-50 cursor-not-allowed"
              }
            `}
            onClick={handleSubmit}
            disabled={!isFormValid}
          >
            Start Session
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
