import { supabase } from "../../../lib/supabaseClient";

export async function getDashboardSummary() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  const userId = userData.user.id;

  const [
    { data: incomes },
    { data: expenses },
    { data: goals },
  ] = await Promise.all([
    supabase.from("incomes").select("amount").eq("user_id", userId),
    supabase.from("expenses").select("amount, category").eq("user_id", userId),
    supabase.from("goals").select("current_amount, target_amount").eq("user_id", userId),
  ]);

  // Totals
  const totalIncome =
    incomes?.reduce((acc, i) => acc + Number(i.amount), 0) ?? 0;

  const totalExpenses =
    expenses?.reduce((acc, e) => acc + Number(e.amount), 0) ?? 0;

  // Group by category
  const categoryMap: Record<string, number> = {};
  expenses?.forEach((e) => {
    categoryMap[e.category] =
      (categoryMap[e.category] || 0) + Number(e.amount);
  });

  const expensesByCategory = Object.entries(categoryMap).map(
    ([category, total]) => ({
      category, total,
    }));

  return {
    totalIncome, totalExpenses, expensesByCategory,
    goals: goals ?? [],
  };}
