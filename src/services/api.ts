import { supabase } from "@/lib/supabase/client";
import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
});

api.interceptors.request.use((config) => {
  const session = supabase.auth.session();
  if (session?.access_token) {
    config.headers = config.headers || {};
    config.headers["Authorization"] = `Bearer ${session.access_token}`;
  }
  return config;
});
