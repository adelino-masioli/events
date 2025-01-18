// lib/supabase/client.ts

import {
  createClient as createSupabaseClient,
  SupabaseClient,
} from "@supabase/supabase-js";

let supabaseInstance: SupabaseClient | null = null;

export function createClient() {
  if (!supabaseInstance) {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_URL");
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
      throw new Error("Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY");
    }

    supabaseInstance = createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: true,
        },
        db: {
          schema: "public",
        },
      }
    );
  }

  return supabaseInstance;
}

// Export the instance for direct use
export const supabase = createClient();
