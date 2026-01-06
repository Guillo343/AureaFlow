import {PieChart, Pie, Cell, ResponsiveContainer, Tooltip} from "recharts";

type Props = {
  fixed: number;
  variable: number;
};

const COLORS = ["#8b5cf6", "#22c55e"];

export default function ExpensesBreakdownChart({
  fixed,
  variable,
}: Props) {
  const data = [
    { name: "Fixed", value: fixed },
    { name: "Variable", value: variable },
  ];

  return (
    <div className="rounded-xl bg-[#151515] p-5 border border-white/10">
      <p className="text-sm text-gray-400 mb-3">
        Expenses Breakdown
      </p>

      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={4}
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[index]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-between text-sm mt-4">
        <span className="text-gray-400">
          Fixed:{" "}
          <span className="text-white">
            ${fixed.toLocaleString()}
          </span>
        </span>
        <span className="text-gray-400">
          Variable:{" "}
          <span className="text-white">
            ${variable.toLocaleString()}
          </span>
        </span>
      </div>
    </div>
  );
}
