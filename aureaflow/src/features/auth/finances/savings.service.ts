import { supabase } from "../../../lib/supabaseClient";
import type { Saving } from "./types";

export async function getSavings(): Promise<Saving[]> {
  const { data, error } = await supabase
    .from("savings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data as Saving[];
}

export async function createSaving(
  saving: Omit<Saving, "id" | "created_at">
): Promise<Saving> {
  const { data, error } = await supabase
    .from("savings")
    .insert(saving)
    .select()
    .single();

  if (error) throw error;
  return data as Saving;
}

export async function deleteSaving(id: number) {
  const { error } = await supabase
    .from("savings")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
