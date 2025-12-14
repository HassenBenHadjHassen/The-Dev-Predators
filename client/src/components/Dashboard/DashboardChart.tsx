import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format, subDays } from "date-fns";

interface DashboardChartProps {
  stressLevel?: number;
  timelineEvents?: any[];
}

export default function DashboardChart({ stressLevel, timelineEvents = [] }: DashboardChartProps) {
  const currentStress = stressLevel ?? 50;

  // Derive historical data from timeline events
  // This is a simplified reconstruction. In a real app we might store snapshots.
  // We'll traverse backwards from current stress.

  const daysToShow = 7;
  const data = [];

  // Initialize with last 7 days keys
  const today = new Date();
  for (let i = daysToShow - 1; i >= 0; i--) {
    const date = subDays(today, i);
    data.push({
      date: date,
      day: format(date, "EEE"), // Mon, Tue...
      stress: null as number | null, // Placeholder
    });
  }

  // Set today's stress
  data[daysToShow - 1].stress = currentStress;

  // Group events by day to calculate backwards
  // Sort events descending by date
  const sortedEvents = [...timelineEvents].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // We only carry stress backwards.
  // Previous Stress = Current Stress - (Change)
  // E.g. If current is 50, and last event was +5 (Game Loss), then before that event it was 45.

  // NOTE: This logic assumes timelineEvents covers the whole history. If pagination limits it,
  // we will lose accuracy further back. But for visual approximation it's okay.

  // Map events to days
  // We need to find the stress value at the *end* of each day.

  // Loop backwards through our chart days (from yesterday back to 7 days ago)
  for (let i = daysToShow - 2; i >= 0; i--) {
    const targetDateEnd = new Date(data[i].date);
    targetDateEnd.setHours(23, 59, 59, 999);

    const targetDateStart = new Date(data[i].date);
    targetDateStart.setHours(0, 0, 0, 0);

    // Process all events that happened *after* the end of this target day, up to the point we are currently tracking
    // Actually simpler: iterate events.

    // Let's just find the stress at the end of Day X.
    // Stress(End of Day X) = Stress(End of Day X+1) - Sum(Changes in Day X+1)

    // Filter events that happened on Day(i+1)
    const nextDayStart = new Date(data[i + 1].date);
    nextDayStart.setHours(0, 0, 0, 0);
    const nextDayEnd = new Date(data[i + 1].date);
    nextDayEnd.setHours(23, 59, 59, 999);

    const eventsOnNextDay = sortedEvents.filter(e => {
      const d = new Date(e.createdAt);
      return d >= nextDayStart && d <= nextDayEnd;
    });

    const stressChangeOnNextDay = eventsOnNextDay.reduce((sum, e) => sum + (e.stressChange || 0), 0);

    // Previous day's end stress is:
    // (Stress at end of Next Day) - (Net Change on Next Day)
    // Wait, if I had 50 today, and I had +5 today. Yesterday ended with 45. Correct.
    let prevStress = (data[i + 1].stress || 50) - stressChangeOnNextDay;

    // Clamp
    prevStress = Math.max(0, Math.min(100, prevStress));

    data[i].stress = prevStress;
  }

  // default fill gaps if any (though logic above should set all)
  const chartData = data.map(d => ({
    day: d.day,
    stress: Math.round(d.stress || 50)
  }));


  return (
    <div className="w-full p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl shadow-sm">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <h3 className="font-serif text-2xl font-semibold mb-2">
            Stress Levels
          </h3>
          <p className="text-muted-foreground text-sm">
            Weekly overview of your stress patterns
          </p>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{Math.round(currentStress)}</div>
          <div className="text-xs text-muted-foreground uppercase">Current</div>
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorStress" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--primary)"
                  stopOpacity={0.3}
                />
                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "var(--card)",
                borderColor: "var(--border)",
                borderRadius: "12px",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              itemStyle={{ color: "var(--foreground)" }}
              cursor={{
                stroke: "var(--muted-foreground)",
                strokeWidth: 1,
                strokeDasharray: "3 3",
              }}
            />
            <Area
              type="monotone"
              dataKey="stress"
              stroke="var(--primary)"
              fillOpacity={1}
              fill="url(#colorStress)"
              strokeWidth={3}
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
