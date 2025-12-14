import DashboardChart from "../components/Dashboard/DashboardChart";
import DashboardLogs from "../components/Dashboard/DashboardLogs";
import DashboardTimeline from "../components/Dashboard/DashboardTimeline";
import { Sparkles } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-primary/10">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">
              MindSpace
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-secondary overflow-hidden border border-border">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-10 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-balance">
            Welcome back, <span className="text-primary">Alex</span>
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl text-balance">
            Your safe space to track, reflect, and grow. Here's how you've been
            doing lately.
          </p>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Logs (Sticky) */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24 space-y-6">
              <DashboardLogs />

              {/* Daily Quote Card */}
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/10">
                <p className="font-serif italic text-lg mb-4 text-primary">
                  "The only way out is through."
                </p>
                <p className="text-xs font-semibold text-primary/60 uppercase tracking-widest">
                  Daily Wisdom
                </p>
              </div>
            </div>
          </div>

          {/* Center Column - Timeline */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <DashboardTimeline />
          </div>

          {/* Right Column - Stats (Sticky) */}
          <div className="lg:col-span-3 order-3">
            <div className="sticky top-24 space-y-6">
              <DashboardChart />

              {/* Summary Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">5</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Streak Days
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-card border border-border/50 text-center">
                  <div className="text-3xl font-bold text-primary mb-1">12</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wide">
                    Entries
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
