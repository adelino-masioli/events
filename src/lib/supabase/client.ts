// lib/supabase/client.ts

import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "@supabase/supabase-js";

let supabase: SupabaseClient | null = null;

export function createClient() {
  // Se a instância já foi criada, reutilize
  if (!supabase) {
    supabase = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  return supabase;
}
