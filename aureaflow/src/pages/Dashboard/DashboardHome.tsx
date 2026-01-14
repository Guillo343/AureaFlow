import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { getDashboardData } from "../../features/auth/finances/dashboardData.service";
import type { DashboardData } from "../../models/dashboard";

import IncomeWidget from "./Widgets/IncomeWidget";
import ExpensesWidget from "./Widgets/ExpensesWidget";
import SavingsWidget from "./Widgets/SavingsWidget";
import GoalsWidget from "./Widgets/GoalsWidget";

import ExpensesBreakdownChart from "./Widgets/ExpensesBreakdownChart";
import ExpensesByCategoryChart from "./Widgets/ExpensesByCategoryChart";
import ExpenseTrendChart from "./Widgets/ExpensesTrendChart";

export default function DashboardHome() {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState<DashboardData | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadDashboard() {
      try {
        const data = await getDashboardData();
        if (mounted) setSummary(data);
      } catch (error) {
        console.error("Dashboard load error:", error);
        if (mounted) setSummary(null);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadDashboard();

    return () => {
      mounted = false;
    };
  }, []);

  /* ---------------------------- Loading State ---------------------------- */

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-white/10 rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="h-64 bg-white/10 rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    );
  }
  /* ----------------------------- Error State ----------------------------- */
  if (!summary) {
    return (
      <div className="text-center py-20 text-gray-400">
        Something went wrong while loading your dashboard.
      </div>
    );
  }
  /* ----------------------------- Ready State ----------------------------- */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Overview</h1>
          <p className="text-sm text-gray-400">
            {summary.period.month}/{summary.period.year}
          </p>
        </div>

        <select
          className="bg-[#151515] border border-white/10 rounded-lg px-3 py-2 text-sm text-gray-300"
          disabled
        >
          <option>This Month</option>
          <option>Last Month</option>
          <option>Last 3 Months</option>
        </select>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* KPIs */}
        <IncomeWidget total={summary.incomes.total} />

        <ExpensesWidget
          total={summary.expenses.total}
          fixed={summary.expenses.fixed}
          variable={summary.expenses.variable}
        />

        <SavingsWidget savings={summary.totals.balance} />

        {/* Charts */}
        <ExpensesBreakdownChart
          fixed={summary.expenses.fixed}
          variable={summary.expenses.variable}
        />

        <ExpensesByCategoryChart
          data={summary.expenses.byCategory}
        />

        {/* Trend */}
        <div className="col-span-1 md:col-span-3">
          <ExpenseTrendChart data={summary.trendData ?? []} />
        </div>

        {/* Goals */}
        <div className="col-span-1 md:col-span-3">
          <GoalsWidget goals={summary.goals} />
        </div>
      </div>
    </motion.div>
  );
}
