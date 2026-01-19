import { supabase } from "../../lib/supabaseClient";
import type { DashboardData } from "../../models/dashboard";

export async function getDashboardData(): Promise<DashboardData> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Not authenticated");
  }

  const now = new Date();

  const period = {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };

  const [incomesRes, expensesRes, goalsRes, profileRes] = await Promise.all([
    supabase.from("incomes").select("amount").eq("user_id", user.id),
    supabase.from("expenses").select("amount, category, type").eq("user_id", user.id),
    supabase.from("goals").select("id, name, current_amount, target_amount").eq("user_id", user.id),
    supabase.from("profiles").select("name").eq("id", user.id).single(),
  ]);

  if (
    incomesRes.error ||
    expensesRes.error ||
    goalsRes.error ||
    profileRes.error
  ) {
    throw new Error("Error fetching dashboard data");
  }

  const totalIncome =
    incomesRes.data?.reduce((sum, i) => sum + Number(i.amount), 0) ?? 0;

  const totalExpenses =
    expensesRes.data?.reduce((sum, e) => sum + Number(e.amount), 0) ?? 0;

  const fixedExpenses =
    expensesRes.data
      ?.filter((e) => e.type === "fixed").reduce((sum, e) => sum + Number(e.amount), 0) ?? 0;

  const variableExpenses =
    expensesRes.data?.filter((e) => e.type === "variable").reduce((sum, e) => sum + Number(e.amount), 0) ?? 0;

  const byCategoryMap: Record<string, number> = {};

  expensesRes.data?.forEach((e) => {
    byCategoryMap[e.category] =
      (byCategoryMap[e.category] || 0) + Number(e.amount);
  });

  const expensesByCategory = Object.entries(byCategoryMap).map(
    ([category, total]) => ({
      category,
      total,
    })
  );

  const goals =
    goalsRes.data?.map((g) => ({
      id: g.id,
      name: g.name,
      currentAmount: Number(g.current_amount),
      targetAmount: Number(g.target_amount),
      progress:
        g.target_amount > 0
          ? Math.round((g.current_amount / g.target_amount) * 100): 0,
    })) ?? [];

  const savings = {
    current: totalIncome - totalExpenses,
    target: goals.reduce((sum, g) => sum + g.targetAmount, 0) || 0,
    progress: totalIncome > 0
        ? Math.round(((totalIncome - totalExpenses) / totalIncome) * 100)
        : 0,};

  return {
    user: {
      id: user.id,
      name: profileRes.data?.name || "User",
    },
    period,
    totals: {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses,
    },
    expenses: {
      total: totalExpenses,
      fixed: fixedExpenses,
      variable: variableExpenses,
      byCategory: expensesByCategory,
    },
    incomes: {
      total: totalIncome,
    },
    savings,
    goals,
  };
}
