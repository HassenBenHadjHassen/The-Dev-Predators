import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { day: "Mon", stress: 65 },
  { day: "Tue", stress: 45 },
  { day: "Wed", stress: 75 },
  { day: "Thu", stress: 50 },
  { day: "Fri", stress: 35 },
  { day: "Sat", stress: 20 },
  { day: "Sun", stress: 40 },
];

export default function DashboardChart() {
  return (
    <div className="w-full p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-3xl shadow-sm">
      <div className="mb-6">
        <h3 className="font-serif text-2xl font-semibold mb-2">
          Stress Levels
        </h3>
        <p className="text-muted-foreground text-sm">
          Weekly overview of your stress patterns
        </p>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
