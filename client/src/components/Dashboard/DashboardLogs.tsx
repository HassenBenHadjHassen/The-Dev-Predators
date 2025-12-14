import { useState } from "react";
import { Button } from "../ui/button";
import { Send, BookOpen } from "lucide-react";
import { CheckInApi } from "@/api/checkInApi";

export default function DashboardLogs() {
  const [logContent, setLogContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLog = async () => {
    if (!logContent.trim()) return;

    setIsSubmitting(true);
    try {
      await CheckInApi.createCheckIn({
        emotionalState: "Daily Log",
        intensityLevel: 5,
        situation: [logContent],
        goal: []
      });
      setLogContent("");
      // Ideally trigger a refresh of the timeline here, but for now just clear input
    } catch (error) {
      console.error("Failed to log entry:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl shadow-sm p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-2">Daily Logs</h3>
          <p className="text-muted-foreground text-sm">
            Record your thoughts and feelings
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-primary" />
        </div>
      </div>

      {/* Input Area */}
      <div className="flex-1 mb-6">
        <textarea
          value={logContent}
          onChange={(e) => setLogContent(e.target.value)}
          className="w-full h-full min-h-[150px] p-4 rounded-xl bg-background/50 border border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/50 resize-none transition-all placeholder:text-muted-foreground/50 text-foreground"
          placeholder="How are you feeling right now?"
        />
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          Your thoughts are private and secure
        </span>
        <Button
          size="sm"
          className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90"
          onClick={handleLog}
          disabled={isSubmitting || !logContent.trim()}
        >
          <Send className="w-4 h-4 mr-2" />
          {isSubmitting ? "Logging..." : "Log Entry"}
        </Button>
      </div>

      {/* Recent Logs List (Mini) - This could be dynamic but sticking to static for now as timeline handles history */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
          Recent Entries
        </h4>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors border border-transparent hover:border-border/50 cursor-pointer"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Anxiety check-in</span>
                <span className="text-xs text-muted-foreground">2h ago</span>
              </div>
              <p className="text-xs text-muted-foreground line-clamp-1">
                Feeling a bit better after the breathing exercise...
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
