import { useEffect, useState } from "react";
import { getDashboardSummary } from "../../features/auth/finances/dashboard.service";

import IncomeWidget from "./Widgets/IncomeWidget";
import ExpensesWidget from "./Widgets/ExpensesWidget";
import ExpensesBreakdownChart from "./Widgets/ExpensesBreakdownChart";
import ExpensesByCategoryChart from "./Widgets/ExpensesByCategoryChart";
import SavingsWidget from "./Widgets/SavingsWidget";
import GoalsWidget from "./Widgets/GoalsWidget";

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    getDashboardSummary()
      .then((data) => mounted && setSummary(data))
      .catch(() => mounted && setSummary(null))
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (!summary) return <div>Error loading data</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <IncomeWidget total={summary.totalIncome} />
        <ExpensesWidget total={summary?.totalExpenses ?? 0} fixed={summary?.fixedExpenses ?? 0} variable={summary?.variableExpenses ?? 0} />
        <ExpensesBreakdownChart fixed={summary?.fixedExpenses ?? 0} variable={summary?.variableExpenses ?? 0} />
        <ExpensesByCategoryChart  data={summary.expensesByCategory ?? []} />
        <SavingsWidget savings={summary.totalIncome - summary.totalExpenses} />
        <GoalsWidget goals={summary.goals} />
      </div>
    </div>
  );
}
