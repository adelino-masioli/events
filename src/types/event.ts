export interface TicketType {
  type: string;
  price: number;
}

export interface RawEvent {
  id: string;
  name: string;
  description: string;
  location: { address: string; coordinates: { lat: number; lng: number } };
  date: string;
  end_date: string;
  thumbnail_url: string;
  banner_url: string;
  is_featured: boolean;
  status: string;
  city?: {
    name: string;
    state: {
      uf: string;
      name: string;
    };
  };
  formattedDate?: string;
  ticket_types?: TicketType[];
  organizer: {
    name: string;
    email: string;
    phone: string;
    whatsapp: string;
  };
}

export interface Event extends RawEvent {
  prices: {
    full: number;
    half: number;
    child: number;
  };
}
