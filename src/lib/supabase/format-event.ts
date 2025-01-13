import { Event, TicketType } from "@/types/event";

export const formatEvent = (event: RawEvent): Event => {
  return {
    id: event.id,
    name: event.name,
    date: event.date,
    end_date: event.end_date,
    location:
      typeof event.location === "string"
        ? JSON.parse(event.location)
        : event.location,
    description: event.description,
    banner_url: event.banner_url,
    thumbnail_url: event.thumbnail_url,
    is_featured: event.is_featured,
    status: event.status,
    city: event.city
      ? {
          name: event.city.name,
          state: {
            uf: event.city.state.uf,
            name: event.city.state.name,
          },
        }
      : undefined,
    formattedDate: event.formattedDate,
    prices: {
      full:
        event.ticket_types?.find((t: TicketType) => t.type === "full")?.price ||
        0,
      half:
        event.ticket_types?.find((t: TicketType) => t.type === "half")?.price ||
        0,
      child:
        event.ticket_types?.find((t: TicketType) => t.type === "child")
          ?.price || 0,
    },
    organizer: {
      name: event.organizer.name,
      email: event.organizer.email,
      phone: event.organizer.phone,
      whatsapp: event.organizer.whatsapp,
    },
  };
};
