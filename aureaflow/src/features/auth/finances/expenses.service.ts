import { supabase } from "../../../lib/supabaseClient";
import type { Expense } from "./types";

export async function getExpenses(): Promise<Expense[]> {
  const { data, error } = await supabase.from("expenses").select("*").order("date", { ascending: false });

  if (error) throw error;
  return data as Expense[];
}

export async function createExpense(
  expense: Omit<Expense, "id" | "created_at">
) {
  const { data, error } = await supabase.from("expenses").insert(expense).select().single();

  if (error) throw error;
  return data as Expense;
}

export async function deleteExpense(id: number) {
  const { error } = await supabase.from("expenses").delete().eq("id", id);

  if (error) throw error;
}
