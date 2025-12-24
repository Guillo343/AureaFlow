import { supabase } from "../../../lib/supabaseClient";
import type { Goal } from "./types";

/**
 * Obtener todas las metas del usuario ordenadas por prioridad
 */
export async function getGoals(): Promise<Goal[]> {
  const { data, error } = await supabase
    .from("goals")
    .select("*")
    .order("priority", { ascending: true });

  if (error) throw error;
  return data as Goal[];
}

/**
 * Crear una nueva meta
 * id y created_at los genera Supabase
 */
export async function createGoal(
  goal: Omit<Goal, "id" | "created_at">
) {
  const { error } = await supabase
    .from("goals")
    .insert([goal]);

  if (error) throw error;
}

/**
 * Actualizar una meta
 */
export async function updateGoal(
  id: number,
  updates: Partial<Goal>
) {
  const { error } = await supabase
    .from("goals")
    .update(updates)
    .eq("id", id);

  if (error) throw error;
}

/**
 * Eliminar una meta
 */
export async function deleteGoal(id: number) {
  const { error } = await supabase
    .from("goals")
    .delete()
    .eq("id", id);

  if (error) throw error;
}
