import { supabase } from "@/lib/supabase/client";

export interface TicketResponse {
  id: string;
  status: "pending" | "confirmed" | "used" | "cancelled";
  created_at: string;
  event: {
    id: string;
    name: string;
    date: string;
    end_date: string;
    location: string;
  };
  ticket_type: {
    id: string;
    name: string;
    price: number;
  };
}

export const ticketService = {
  async getUserTickets(): Promise<TicketResponse[]> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("No user session found");
      }

      const { data, error } = await supabase
        .from("tickets")
        .select(
          `
          id,
          status,
          created_at,
          event:event_id (
            id,
            name,
            date,
            end_date,
            location
          ),
          ticket_type:ticket_type_id (
            id,
            name,
            price
          )
        `
        )
        .eq("user_id", session.session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TicketResponse[];
    } catch (error) {
      console.error("Error fetching tickets:", error);
      throw error;
    }
  },
};
