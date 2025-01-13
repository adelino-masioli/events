import { createClient } from "@/lib/supabase/client";
import { RawEvent } from "@/types/event";

export const fetchEventFromDatabase = async (
  id: string
): Promise<RawEvent | null> => {
  const supabase = createClient();

  const { data: event, error } = await supabase
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
    ticket_types:ticket_types(
      type,
      price
    ),
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
    .eq("id", id)
    .single();

  if (error || !event) {
    console.error("Error fetching event:", error);
    return null;
  }

  return event;
};
