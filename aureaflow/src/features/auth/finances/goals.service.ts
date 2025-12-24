import { supabase } from "../../../lib/supabaseClient";
import type { Goal } from "./types";

export async function getGoals(): Promise<Goal[]> {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .order("priority", { ascending: true });

  if (error) throw error;
  return data as Goal[];
}

export async function createGoal(goal: Omit<Goal, "id" | "created_at">) {
  const { error } = await supabase.from("goals").insert(goal);
  if (error) throw error;
}

export async function updateGoal(
  id: string,
  updates: Partial<Goal>
) {
  const { error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteGoal(id: string) {
  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
