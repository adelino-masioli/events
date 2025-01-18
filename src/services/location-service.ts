import { supabase } from "@/lib/supabase/client";
import { City, State } from "@/types/location";

export const locationService = {
  async getStates(): Promise<State[]> {
    const { data, error } = await supabase
      .from("states")
      .select("id, name, uf")
      .order("name");

    if (error) throw error;
    return data;
  },

  async getCitiesByState(stateId: string): Promise<City[]> {
    const { data, error } = await supabase
      .from("cities")
      .select("id, name, state_id")
      .eq("state_id", stateId)
      .order("name");

    if (error) throw error;
    return data;
  },
};
