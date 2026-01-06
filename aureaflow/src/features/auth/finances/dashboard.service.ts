import { supabase } from "../../../lib/supabaseClient";

export async function getDashboardSummary() {
  const { data: userData } = await supabase.auth.getUser();
  if (!userData.user) throw new Error("Not authenticated");

  const userId = userData.user.id;

  const [
    { data: incomes },
    { data: expenses },
    { data: goals },
    { data: expensesRaw },
  ] = await Promise.all([
    supabase.from("incomes").select("amount").eq("user_id", userId),
    supabase.from("expenses").select("amount").eq("user_id", userId),
    supabase
      .from("goals")
      .select("current_amount, target_amount")
      .eq("user_id", userId),
    supabase
      .from("expenses")
      .select("category, amount")
      .eq("user_id", userId),
  ]);

  // ---- group expenses by category ----
  const expensesByCategory = Object.values(
    (expensesRaw ?? []).reduce<Record<string, { category: string; total: number }>>(
      (acc, curr) => {
        if (!acc[curr.category]) {
          acc[curr.category] = {
            category: curr.category,
            total: 0,
          };
        }
        acc[curr.category].total += Number(curr.amount);
        return acc;
      },
      {}
    )
  );

  return {
    totalIncome:
      incomes?.reduce((acc, i) => acc + Number(i.amount), 0) ?? 0,

    totalExpenses:
      expenses?.reduce((acc, e) => acc + Number(e.amount), 0) ?? 0,

    expensesByCategory, // 👈 ESTO ES LO QUE EL CHART NECESITA
    goals: goals ?? [],
  };
}
