import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../context/ThemeContext.jsx";

export default function WeeklyBarChart({ data, title = "Last 7 days" }) {
  const { theme } = useTheme();
  const grid = theme === "dark" ? "rgba(255,255,255,0.08)" : "rgba(15,15,27,0.08)";
  const tick = theme === "dark" ? "#8a8aa0" : "#6b6b78";
  const tooltipBg = theme === "dark" ? "#23211a" : "#ffffff";
  const tooltipBorder = theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(15,15,27,0.08)";
  return (
    <div className="card p-5">
      <div className="text-sm font-medium mb-3">{title}</div>
      <div style={{ width: "100%", height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke={grid} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12, fill: tick }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: tick }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              cursor={{ fill: theme === "dark" ? "rgba(255,255,255,0.04)" : "rgba(15,15,27,0.04)" }}
              contentStyle={{
                background: tooltipBg,
                border: `1px solid ${tooltipBorder}`,
                borderRadius: 8,
                fontSize: 12,
                color: theme === "dark" ? "#f1efe8" : "#191712",
              }}
            />
            <Bar dataKey="count" fill="#305a3b" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
