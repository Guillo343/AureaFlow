import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  CartesianGrid,
} from "recharts";
import { motion } from "framer-motion";
import { DollarSign } from "lucide-react";
import { useState } from "react";

type CategoryData = {
  category: string;
  total: number;
};

const CATEGORY_COLORS: Record<string, string> = {
  Food: "#f59e0b",
  Transport: "#3b82f6",
  Entertainment: "#8b5cf6",
  Health: "#10b981",
  Shopping: "#ec4899",
  Bills: "#ef4444",
  Other: "#6b7280",
};

export default function ExpensesByCategoryChart({
  data,
}: {
  data: CategoryData[];
}) {
  const [hoveredBar, setHoveredBar] = useState<string | null>(null);

  // Empty state
  if (!data || data.length === 0) {
    return (
      <div className="rounded-xl bg-gradient-to-br from-[#151515] to-[#1a1a1a] p-6 border border-white/10 col-span-1 md:col-span-2">
        <p className="text-sm text-gray-400 mb-2">Expenses by Category</p>
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <DollarSign className="w-12 h-12 text-gray-600 mb-3" />
          <p className="text-gray-500 text-sm">No expenses recorded yet</p>
          <p className="text-gray-600 text-xs mt-1">
            Start tracking to see insights
          </p>
        </div>
      </div>
    );
  }

  // Calcular totales y ordenar
  const sortedData = [...data].sort((a, b) => b.total - a.total);
  const totalExpenses = data.reduce((sum, item) => sum + item.total, 0);
  const topCategory = sortedData[0];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload[0]) return null;

    const item = payload[0].payload;
    const percentage = ((item.total / totalExpenses) * 100).toFixed(1);

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#1a1a1a] border border-white/20 rounded-lg p-4 shadow-2xl"
      >
        <div className="flex items-center gap-2 mb-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: CATEGORY_COLORS[item.category] || "#6b7280",
            }}
          ></div>
          <p className="text-white font-semibold">{item.category}</p>
        </div>
        <p className="text-2xl font-bold text-white mb-1">
          ${item.total.toLocaleString()}
        </p>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs">{percentage}% of total</span>
          <span className="text-gray-600">•</span>
          <span className="text-gray-400 text-xs">
            ${(item.total / 30).toFixed(0)}/day
          </span>
        </div>
      </motion.div>
    );
  };

  // Custom Bar Shape
  const CustomBar = (props: any) => {
    const { fill, x, y, width, height, payload } = props;
    const isHovered = hoveredBar === payload.category;

    return (
      <g
        onMouseEnter={() => setHoveredBar(payload.category)}
        onMouseLeave={() => setHoveredBar(null)}
      >
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          rx={6}
          ry={6}
          style={{
            filter: isHovered
              ? "drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5))"
              : "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
            transition: "all 0.3s ease",
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          }}
        />
      </g>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-xl bg-gradient-to-br from-[#151515] to-[#1a1a1a] p-6 border border-white/10 shadow-2xl col-span-1 md:col-span-2"
    >
      {/* Header con stats */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Expenses by Category</p>
          <p className="text-2xl font-bold text-white">
            ${totalExpenses.toLocaleString()}
          </p>
        </div>

        {/* Top Category Badge */}
        <div className="bg-orange-500/20 border border-orange-500/30 rounded-lg px-3 py-2">
          <p className="text-xs text-gray-400 mb-1">Top Category</p>
          <div className="flex items-center gap-2">
            <div
              className="w-2 h-2 rounded-full"
              style={{
                backgroundColor:
                  CATEGORY_COLORS[topCategory.category] || "#6b7280",
              }}
            ></div>
            <span className="text-sm font-semibold text-white">
              {topCategory.category}
            </span>
          </div>
          <p className="text-xs text-orange-400 mt-1">
            ${topCategory.total.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Chart - LA CLAVE ESTÁ AQUÍ */}
      <div className="w-full" style={{ height: "288px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2a2a2a"
              vertical={false}
            />
            <XAxis
              dataKey="category"
              stroke="#6b7280"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={{ stroke: "#2a2a2a" }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={{ stroke: "#2a2a2a" }}
              tickFormatter={(value) => `$${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(255,255,255,0.05)" }}
            />
            <Bar
              dataKey="total"
              radius={[8, 8, 0, 0]}
              maxBarSize={60}
              shape={<CustomBar />}
            >
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={CATEGORY_COLORS[entry.category] || "#6b7280"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Category Legend */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {sortedData.slice(0, 4).map((item) => {
          const percentage = ((item.total / totalExpenses) * 100).toFixed(0);
          return (
            <div
              key={item.category}
              className="bg-white/5 rounded-lg p-2 border border-white/10 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{
                    backgroundColor:
                      CATEGORY_COLORS[item.category] || "#6b7280",
                  }}
                ></div>
                <span className="text-xs text-gray-400 truncate">
                  {item.category}
                </span>
              </div>
              <p className="text-white font-semibold text-sm">
                ${item.total.toLocaleString()}
              </p>
              <p className="text-xs text-gray-500">{percentage}%</p>
            </div>
          );
        })}
      </div>

      {/* Insight */}
      <div className="mt-4 p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-purple-400 text-sm">📊</span>
          <p className="text-xs text-gray-300">
            <span className="text-white font-semibold">
              {topCategory.category}
            </span>{" "}
            represents{" "}
            <span className="text-white font-semibold">
              {((topCategory.total / totalExpenses) * 100).toFixed(0)}%
            </span>{" "}
            of your spending. Consider setting a budget limit.
          </p>
        </div>
      </div>
    </motion.div>
  );
}