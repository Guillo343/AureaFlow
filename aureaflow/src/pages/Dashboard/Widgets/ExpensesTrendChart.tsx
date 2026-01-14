import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid} from "recharts";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";

type TrendData = {
  date: string;
  income: number;
  expenses: number;
};

export default function ExpenseTrendChart({ data }: { data: TrendData[] }) {
  // Calcular tendencia
  const currentMonth = data[data.length - 1];
  const previousMonth = data[data.length - 2];
  const trend =
    currentMonth && previousMonth
      ? ((currentMonth.expenses - previousMonth.expenses) /
          previousMonth.expenses) *
        100
      : 0;

  const isPositiveTrend = trend <= 0; 

  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-3 shadow-xl">
        <p className="text-gray-400 text-xs mb-2">
          {payload[0]?.payload?.date}
        </p>
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-4">
            <span className="text-green-400 text-xs">Income:</span>
            <span className="text-white font-semibold">
              ${payload[0]?.value?.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-red-400 text-xs">Expenses:</span>
            <span className="text-white font-semibold">
              ${payload[1]?.value?.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-white/10 pt-1 mt-1">
            <div className="flex items-center justify-between gap-4">
              <span className="text-gray-400 text-xs">Balance:</span>
              <span
                className={`font-semibold ${
                  payload[0]?.value - payload[1]?.value >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ${(payload[0]?.value - payload[1]?.value).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-xl bg-linear-to-br from-[#151515] to-[#1a1a1a] p-6 border border-white/10 shadow-2xl col-span-3"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-sm text-gray-400 mb-1">Income vs Expenses</p>
          <p className="text-2xl font-bold text-white">Last 6 Months</p>
        </div>

        {/* Trend Badge */}
        <div
          className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
            isPositiveTrend
              ? "bg-green-500/20 border border-green-500/30"
              : "bg-red-500/20 border border-red-500/30"
          }`}
        >
          {isPositiveTrend ? (
            <TrendingDown className="w-4 h-4 text-green-400" />
          ) : (
            <TrendingUp className="w-4 h-4 text-red-400" />
          )}
          <span
            className={`text-sm font-semibold ${
              isPositiveTrend ? "text-green-400" : "text-red-400"
            }`}
          >
            {Math.abs(trend).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#2a2a2a"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              stroke="#6b7280"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={{ stroke: "#2a2a2a" }}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              axisLine={{ stroke: "#2a2a2a" }}
              tickFormatter={(value) => `$${value / 1000}k`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="income"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#incomeGradient)"
              animationDuration={1000}
            />
            <Area
              type="monotone"
              dataKey="expenses"
              stroke="#ef4444"
              strokeWidth={2}
              fill="url(#expenseGradient)"
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
          <span className="text-sm text-gray-400">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <span className="text-sm text-gray-400">Expenses</span>
        </div>
      </div>
    </motion.div>
  );
}
