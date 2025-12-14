import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Send, BookOpen } from "lucide-react";
import { DailyLogApi } from "@/api/dailyLogApi";
import { useCompanion } from "@/context/CompanionContext";

export default function DashboardLogs() {
  const [logContent, setLogContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [logs, setLogs] = useState<any[]>([]);
  const { triggerRefresh } = useCompanion();

  const fetchLogs = async () => {
    try {
      const response = await DailyLogApi.getLogs();
      if (response && response.success) {
        setLogs(response.data);
      }
    } catch (error) {
      console.error("Failed to fetch logs:", error);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  const handleLog = async () => {
    if (!logContent.trim()) return;

    setIsSubmitting(true);
    try {
      await DailyLogApi.createLog(logContent);
      setLogContent("");
      // Refresh the logs list
      fetchLogs();
      // Trigger global refresh for timeline
      triggerRefresh();
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

      {/* Recent Logs List */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <h4 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
          Recent Entries
        </h4>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
          {logs.length > 0 ? (
            logs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors border border-transparent hover:border-border/50 cursor-pointer"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Log Entry</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {log.content}
                </p>
              </div>
            ))
          ) : (
            <div className="text-center py-6 text-muted-foreground text-sm">
              <p>No logs yet.</p>
              <p className="text-xs mt-1 opacity-70">Share your thoughts to get started.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
