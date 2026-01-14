import { supabase } from "../../../lib/supabaseClient";
import { getDashboardSummary } from "./dashboard.service";
import type { DashboardData } from "../../../models/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  const summary = await getDashboardSummary();
  const now = new Date();

  return {
    user: {
      id: userData.user.id,
      name: userData.user.email ?? "User",
    },

    period: {
      month: now.getMonth() + 1,
      year: now.getFullYear(),
    },

    totals: {
      totalIncome: summary.totalIncome,
      totalExpenses: summary.totalExpenses,
      balance: summary.totalIncome - summary.totalExpenses,
    },

    incomes: {
      total: summary.totalIncome,
    },

    expenses: {
      total: summary.totalExpenses,
      fixed: summary.fixedExpenses ?? 0,
      variable: summary.variableExpenses ?? 0,
      byCategory: summary.expensesByCategory,
    },

    savings: {
      current: summary.totalIncome - summary.totalExpenses,
      target: 0,
      progress: 0,
    },

    goals: summary.goals,

    trendData: [], // placeholder, luego lo llenamos bien
  };
}
