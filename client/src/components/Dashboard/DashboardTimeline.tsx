import { Calendar, Smile, Frown, Meh, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

// Mock data - eventually this will come from props or API
const MOCK_EVENTS = [
  {
    id: 1,
    date: "Today, 2:30 PM",
    title: "Moment of Clarity",
    description:
      "Felt really grounded after the meditation session. The anxiety about the presentation subsided.",
    mood: "good",
    icon: Sparkles,
  },
  {
    id: 2,
    date: "Yesterday, 8:00 PM",
    title: "Evening Reflection",
    description:
      "A bit overwhelmed by the quantity of tasks, but writing them down helped clear my mind.",
    mood: "neutral",
    icon: Meh,
  },
  {
    id: 3,
    date: "Mar 12, 10:00 AM",
    title: "Stress Spike",
    description:
      "Unexpected conflict at work triggered a stress response. Deep breathing helped manage the immediate reaction.",
    mood: "bad",
    icon: Frown,
  },
  {
    id: 4,
    date: "Mar 10, 9:00 AM",
    title: "Great Start",
    description:
      "Woke up feeling refreshed and energetic. Ready to tackle the week.",
    mood: "good",
    icon: Smile,
  },
];

export default function DashboardTimeline() {
  return (
    <div className="relative space-y-8 p-4 md:p-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-foreground">
          Your Journey
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto">
          A timeline of your thoughts, feelings, and moments of growth.
        </p>
      </div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/10 via-primary/40 to-primary/10 -translate-x-1/2 md:translate-x-0" />

        <div className="space-y-12">
          {MOCK_EVENTS.map((event, index) => {
            const isLeft = index % 2 === 0;
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
                  <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse-glow" />
                </div>

                {/* Empty Space for Grid Layout */}
                <div className="hidden md:block flex-1" />
              </div>
            );
          })}
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
