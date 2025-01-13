import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export async function getAllEvents() {
  try {
    const supabase = createClient();

    const { data: events, error } = await supabase
      .from("events")
      .select(
        `
        id,
        name,
        description,
        location,
        date,
        end_date,
        thumbnail_url,
        banner_url,
        is_featured,
        status,
        organizer:organizers(
          id,
          name,
          email,
          phone,
          whatsapp
        ),
        city:cities(
          id,
          name,
          state:states(
            id,
            name,
            uf
          )
        )
      `
      )
      .eq("status", "published")
      .order("date", { ascending: true });

    if (error) {
      console.error("Error fetching events:", error);
      return [];
    }

    // Formatar a data no servidor antes de retornar
    const formattedEvents = events.map((event) => ({
      ...event,
      formattedDate: format(new Date(event.date), "dd 'de' MMMM", {
        locale: ptBR,
      }),
      city: {
        name: event.city.name,
        state: {
          name: event.city.state.name,
          uf: event.city.state.uf,
        },
      },
    }));

    return formattedEvents;
  } catch (error) {
    console.error("Error in getEvents:", error);
    return [];
  }
}
