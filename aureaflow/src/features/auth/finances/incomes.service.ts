import { supabase } from "../../../lib/supabaseClient";
import type { Income } from "./types";

export async function getIncomes(): Promise<Income[]> {
  const { data, error } = await supabase.from("incomes").select("*").order("created_at", { ascending: false });

  if (error) throw error;
  return data as Income[];
}

export async function createIncome(
  income: Omit<Income, "id" | "created_at">
) {
  const { data, error } = await supabase.from("incomes").insert(income).select().single();

  if (error) throw error;
  return data as Income;
}

export async function deleteIncome(id: number) {
  const { error } = await supabase.from("incomes").delete().eq("id", id);

  if (error) throw error;
}
