import { supabase } from "../../../lib/supabaseClient";

export async function getGoals() {
  const { data, error } = await supabase.from("goals").select("*");
  if (error) throw error;
  return data;
}

export async function createGoal(payload: {
  title: string;
  target_amount: number;
}) {
  const { error } = await supabase.from("goals").insert(payload);
  if (error) throw error;
}
