import { supabase } from "../../../lib/supabaseClient";
import type { Expense } from "./types";

export async function getExpenses(userId: string): Promise<Expense[]> {
  const { data, error } = await supabase
    .from("expenses")
    .select("*")
    .eq("user_id", userId)
    .order("date", { ascending: false });

  if (error) throw error;
  return data as Expense[];
}

export async function createExpense(
  expense: Omit<Expense, "id" | "created_at">
) {
  const { error } = await supabase
    .from("expenses")
    .insert(expense);

  if (error) throw error;
}

export async function deleteExpense(id: number) {
  const { error } = await supabase
    .from("expenses")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

/* ===========================
   DASHBOARD SUMMARY
=========================== */

export async function getExpensesSummary(userId: string) {
  const { data, error } = await supabase
    .from("expenses")
    .select("amount, type")
    .eq("user_id", userId);

  if (error) throw error;

  let total = 0;
  let fixed = 0;
  let variable = 0;

  for (const expense of data) {
    total += expense.amount;

    if (expense.type === "fixed") {
      fixed += expense.amount;
    } else if (expense.type === "variable") {
      variable += expense.amount;
    }
  }

  return {
    total,
    fixed,
    variable,
  };
}
