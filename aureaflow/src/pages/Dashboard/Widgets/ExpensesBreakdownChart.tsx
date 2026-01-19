import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Label,
} from "recharts";
import { motion } from "framer-motion";

type Props = {
  fixed: number;
  variable: number;
};

const COLORS = {
  fixed: "#8b5cf6",
  variable: "#22c55e",
};

export default function ExpensesBreakdownChart({ fixed, variable }: Props) {
  const total = fixed + variable;
  const hasData = total > 0;

  const fixedPercentage = hasData ? ((fixed / total) * 100).toFixed(1) : "0";
  const variablePercentage = hasData
    ? ((variable / total) * 100).toFixed(1)
    : "0";

  const data = [
    { name: "Fixed", value: fixed, color: COLORS.fixed },
    { name: "Variable", value: variable, color: COLORS.variable },
  ];

  // Custom Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (!active || !payload || !payload.length) return null;

    const item = payload[0];
    const percentage = hasData ? ((item.value / total) * 100).toFixed(1) : "0";

    return (
      <div className="bg-[#1a1a1a] border border-white/20 rounded-lg p-3 shadow-xl">
        <p className="text-white font-semibold mb-1">{item.name}</p>
        <p className="text-gray-300 text-sm">${item.value.toLocaleString()}</p>
        <p className="text-gray-400 text-xs mt-1">{percentage}% of total</p>
      </div>
    );
  };

  const renderCenterLabel = ({ viewBox }: any) => {
    const { cx, cy } = viewBox;

    return (
      <g>
        <text
          x={cx}
          y={cy - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white text-2xl font-bold"
        >
          ${total.toLocaleString()}
        </text>
        <text
          x={cx}
          y={cy + 15}
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-gray-400 text-xs"
        >
          Total Expenses
        </text>
      </g>
    );
  };

  // Calculate insight message
  const getInsightMessage = () => {
    if (!hasData) return null;

    if (fixed === 0) {
      return "You have no fixed expenses. Consider tracking recurring bills.";
    }

    if (variable === 0) {
      return "You have no variable expenses tracked this period.";
    }

    if (fixed > variable) {
      const diff = ((fixed / variable - 1) * 100).toFixed(0);
      return (
        <>
          Your fixed expenses are{" "}
          <span className="text-white font-semibold">{diff}% higher</span> than
          variable. Consider reviewing subscriptions.
        </>
      );
    } else {
      const diff = ((variable / fixed - 1) * 100).toFixed(0);
      return (
        <>
          Your variable expenses are{" "}
          <span className="text-white font-semibold">{diff}% higher</span>.
          Track daily spending to optimize.
        </>
      );
    }
  };

  const insightMessage = getInsightMessage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-xl bg-gradient-to-br from-[#151515] to-[#1a1a1a] p-6 border border-white/10 shadow-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-400">Expenses Breakdown</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 rounded-full bg-purple-500"></span>
          <span className="w-2 h-2 rounded-full bg-green-500"></span>
        </div>
      </div>

      {/* Chart */}
      {hasData ? (
        <div className="h-52 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={5}
                startAngle={90}
                endAngle={450}
                animationDuration={1000}
                animationBegin={0}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.color}
                    stroke="none"
                    style={{
                      filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.3))",
                    }}
                  />
                ))}
                <Label content={renderCenterLabel} position="center" />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="h-52 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-8 h-8 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <p className="text-gray-500 text-sm">No expenses recorded</p>
            <p className="text-gray-600 text-xs mt-1">
              Start tracking to see breakdown
            </p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="grid grid-cols-2 gap-4 mt-6">
        {/* Fixed */}
        <div className="bg-white/5 rounded-lg p-3 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            <span className="text-xs text-gray-400">Fixed</span>
          </div>
          <p className="text-white font-semibold text-lg">
            ${fixed.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-purple-400 text-xs font-medium">
              {fixedPercentage}%
            </span>
            <span className="text-gray-500 text-xs">of total</span>
          </div>
        </div>

        {/* Variable */}
        <div className="bg-white/5 rounded-lg p-3 border border-green-500/20 hover:border-green-500/40 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-gray-400">Variable</span>
          </div>
          <p className="text-white font-semibold text-lg">
            ${variable.toLocaleString()}
          </p>
          <div className="flex items-center gap-1 mt-1">
            <span className="text-green-400 text-xs font-medium">
              {variablePercentage}%
            </span>
            <span className="text-gray-500 text-xs">of total</span>
          </div>
        </div>
      </div>

      {/* Insight */}
      {insightMessage && (
        <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-start gap-2">
            <span className="text-blue-400 text-sm">💡</span>
            <p className="text-xs text-gray-300">{insightMessage}</p>
          </div>
        </div>
      )}
    </motion.div>
  );
}
