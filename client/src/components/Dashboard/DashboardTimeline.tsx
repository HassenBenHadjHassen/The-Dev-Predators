import { useState } from "react";
import { Calendar, Smile, Frown, Meh, Sparkles, BookOpen, MessageCircle, Plus, X } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { TimelineApi } from "@/api/timelineApi";
import { useCompanion } from "@/context/CompanionContext";

// Mock data - eventually this will come from props or API
interface DashboardTimelineProps {
  events?: any[];
}

export default function DashboardTimeline({ events = [] }: DashboardTimelineProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [mood, setMood] = useState<"good" | "bad" | "neutral">("neutral");
  const { triggerRefresh } = useCompanion();

  const handleAddEvent = async () => {
    if (!newTitle.trim()) return;

    try {
      let stressChange = 0;
      if (mood === "good") stressChange = -5;
      if (mood === "bad") stressChange = 5;

      await TimelineApi.createEvent({
        title: newTitle,
        description: newDesc,
        type: "MANUAL_ENTRY",
        stressChange,
      });

      setNewTitle("");
      setNewDesc("");
      setIsAdding(false);
      triggerRefresh();
    } catch (error) {
      console.error("Failed to add event:", error);
    }
  };

  const displayEvents = events.map(e => {
    let Icon = Meh;
    if (e.type.includes("WIN") || (e.type === "MANUAL_ENTRY" && e.stressChange < 0)) Icon = Sparkles;
    else if (e.type.includes("LOSS") || (e.type === "MANUAL_ENTRY" && e.stressChange > 0)) Icon = Frown;
    else if (e.type.includes("CHECK_IN")) Icon = Smile;
    else if (e.type.includes("DAILY_LOG")) Icon = BookOpen;
    else if (e.type.includes("AI_CHAT")) Icon = MessageCircle;
    else if (e.type === "MANUAL_ENTRY" && e.stressChange === 0) Icon = Meh;

    return {
      id: e.id,
      date: new Date(e.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: e.title,
      description: e.description,
      mood: e.stressChange < 0 ? "good" : (e.stressChange > 0 ? "bad" : "neutral"),
      icon: Icon
    };
  });

  return (
    <div className="relative space-y-8 p-4 md:p-8">
      <div className="text-center mb-12 relative">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
          Your Journey
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-6">
          A timeline of your thoughts, feelings, and moments of growth.
        </p>

        <Button
          onClick={() => setIsAdding(!isAdding)}
          variant="outline"
          className="rounded-full gap-2 border-primary/20 hover:border-primary/50"
        >
          {isAdding ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isAdding ? "Cancel" : "Add Entry"}
        </Button>
      </div>

      {/* Manual Entry Form */}
      {isAdding && (
        <div className="max-w-md mx-auto mb-12 p-6 bg-card border border-border rounded-2xl shadow-lg animate-in slide-in-from-top-4">
          <h3 className="text-lg font-semibold mb-4">Add Manual Entry</h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <input
                className="w-full bg-background border border-border rounded-lg p-2 text-sm"
                placeholder="e.g. Went for a run"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Description</label>
              <textarea
                className="w-full bg-background border border-border rounded-lg p-2 text-sm min-h-[80px]"
                placeholder="How did it go?"
                value={newDesc}
                onChange={e => setNewDesc(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Effect on Stress</label>
              <div className="flex gap-2">
                <button
                  onClick={() => setMood("good")}
                  className={cn("flex-1 p-2 rounded-lg border text-sm transition-colors", mood === "good" ? "bg-green-500/10 border-green-500 text-green-600" : "border-border hover:bg-accent")}
                >
                  Relief (-Stress)
                </button>
                <button
                  onClick={() => setMood("neutral")}
                  className={cn("flex-1 p-2 rounded-lg border text-sm transition-colors", mood === "neutral" ? "bg-gray-500/10 border-gray-500 text-gray-600" : "border-border hover:bg-accent")}
                >
                  Neutral
                </button>
                <button
                  onClick={() => setMood("bad")}
                  className={cn("flex-1 p-2 rounded-lg border text-sm transition-colors", mood === "bad" ? "bg-red-500/10 border-red-500 text-red-600" : "border-border hover:bg-accent")}
                >
                  Stress (+Stress)
                </button>
              </div>
            </div>
            <Button onClick={handleAddEvent} className="w-full" disabled={!newTitle.trim()}>
              Save Entry
            </Button>
          </div>
        </div>
      )}

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2 md:translate-x-0" />

        <div className="space-y-12">
          {displayEvents.length > 0 ? (
            displayEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              const Icon = event.icon;

              return (
                <div
                  key={event.id}
                  className={cn(
                    "relative flex flex-col md:flex-row gap-8 items-start",
                    isLeft ? "md:flex-row-reverse" : ""
                  )}
                >
                  {/* Content Card */}
                  <div className="flex-1 w-full md:w-auto pl-12 md:pl-0">
                    <div className="group bg-card/50 backdrop-blur-md border border-border/50 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary flex items-center gap-1.5">
                          <Calendar className="w-3 h-3" />
                          {event.date}
                        </span>
                      </div>

                      <h3 className="text-xl font-serif font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Center Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center w-8 h-8 rounded-full bg-background border-4 border-primary/20 z-10 shadow-[0_0_0_4px_var(--color-background)]">
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                  </div>

                  {/* Empty Space for Grid Layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })
          ) : (
            <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-3xl border border-border/50">
              <p>No events recorded yet.</p>
              <p className="text-sm mt-2 opacity-70">Play a game, chat with your companion, or log your thoughts to populate your timeline.</p>
            </div>
          )}
        </div>

        {/* Bottom Decoration */}
        <div className="flex justify-center mt-12">
          <div className="px-6 py-2 rounded-full border border-border/50 bg-card/30 text-sm text-muted-foreground backdrop-blur-sm">
            End of current timeline
          </div>
        </div>
      </div>
    </div>
  );
}
