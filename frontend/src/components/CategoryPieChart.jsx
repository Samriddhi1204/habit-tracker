import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useTheme } from "../context/ThemeContext.jsx";

const COLORS = [
  "#305a3b",
  "#b45309",
  "#7f6a3f",
  "#5c7a8a",
  "#8a5a44",
  "#5f8d68",
  "#6b5b73",
  "#94714f",
  "#4a6b6b",
];

export default function CategoryPieChart({ data }) {
  const { theme } = useTheme();
  return (
    <div className="card p-5">
      <div className="text-sm font-medium mb-3">Completions by category</div>
      {!data?.length ? (
        <div className="text-sm text-muted py-10 text-center">No data yet.</div>
      ) : (
        <div style={{ width: "100%", height: 240 }}>
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                stroke={theme === "dark" ? "rgba(255,255,255,0.06)" : "#ffffff"}
                strokeWidth={2}
              >
                {data.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: theme === "dark" ? "#23211a" : "#ffffff",
                  border: `1px solid ${
                    theme === "dark" ? "#35311f" : "#e4dfd3"
                  }`,
                  borderRadius: 8,
                  fontSize: 12,
                  color: theme === "dark" ? "#f1efe8" : "#191712",
                }}
              />
              <Legend
                wrapperStyle={{
                  fontSize: 12,
                  color: theme === "dark" ? "#b8b8c8" : "#4e4e59",
                }}
                iconType="circle"
                iconSize={8}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
