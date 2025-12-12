import { supabase } from "./supabaseClient";

export async function signInWithEmail(email: string, password: string) {
  return await supabase.auth.signInWithPassword({ email, password });
}

export async function signUpWithEmail(email: string, password: string) {
  return await supabase.auth.signUp({ email, password });
}

export async function signOutUser() {
  return await supabase.auth.signOut();
}

export function getCurrentUser() {
  return supabase.auth.getUser();
}
