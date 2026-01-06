import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer} from "recharts";

type CategoryData = {
  category: string;
  total: number;
};

export default function ExpensesByCategoryChart({
  data,
}: {
  data: CategoryData[];
}) {
  return (
    <div className="rounded-xl bg-[#151515] p-5 border border-white/10">
      <p className="text-sm text-gray-400 mb-4">
        Expenses by Category
      </p>

      <div className="h-64 min-h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis
              dataKey="category"
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}/>
            <YAxis
              stroke="#9ca3af"
              tick={{ fontSize: 12 }}/>
            <Tooltip />
            <Bar
              dataKey="total"
              radius={[6, 6, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
