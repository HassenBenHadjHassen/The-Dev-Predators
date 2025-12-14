import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardChart from "../components/Dashboard/DashboardChart";
import DashboardLogs from "../components/Dashboard/DashboardLogs";
import DashboardTimeline from "../components/Dashboard/DashboardTimeline";
import { Sparkles, Gamepad2 } from "lucide-react";
import { UserApi } from "@/api/userApi";
import { useCompanion } from "@/context/CompanionContext";
import { COMPANIONS } from "../constants/companions";

export default function DashboardPage() {
  const navigate = useNavigate();
  const { setIsOpen } = useCompanion();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await UserApi.getUser();
        if (response.success) {
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, []);

  const companion = COMPANIONS.find((c) => c.id === user?.selectedCompanionId);
  const avatarSrc = companion
    ? companion.src
    : "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix";

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
              The Bright Side
            </span>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-10 text-center md:text-left flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center p-2 border-2 border-primary/20">
              <img
                src={avatarSrc}
                alt="Companion"
                className="w-full h-full object-contain drop-shadow-md transition-transform hover:scale-110 duration-300"
              />
            </div>
            {companion && (
              <div className="absolute -bottom-2 -right-2 bg-background border border-border rounded-full px-3 py-1 text-xs font-semibold shadow-sm">
                Companion
              </div>
            )}
          </div>

          <div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-3 text-balance">
              Welcome back, <span className="text-primary">{user?.fullName || "Friend"}</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl text-balance">
              Your safe space to track, reflect, and grow. Here's how you've been
              doing lately.
            </p>
          </div>
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
              {/* Play Game Card */}
              <button
                onClick={() => navigate("/play")}
                className="w-full text-left p-6 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all shadow-sm hover:shadow-md group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="p-3 bg-indigo-500/20 text-indigo-600 rounded-2xl group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                    <Gamepad2 className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold bg-background/80 backdrop-blur text-foreground px-2 py-1 rounded-full border border-border">
                    RELAX
                  </span>
                </div>
                <h3 className="font-serif font-bold text-xl mb-1 group-hover:text-indigo-700 transition-colors">
                  Color Therapy
                </h3>
                <p className="text-sm text-muted-foreground">
                  Unwind with a calming puzzle.
                </p>
              </button>

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
