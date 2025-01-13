import EventCard from "@/components/event/event-card";
import SectionTitle from "@/components/layout/section-title";
import { getEvents } from "@/lib/getEvents";

import { Event } from "@/types/event";

interface EventsPageProps {
  params: {
    searchTerm: string;
  };
}

export async function generateStaticParams() {
  return [];
}

const EventsPage = async ({ params }: EventsPageProps) => {
  const { searchTerm } = await params;
  const searchTermDecoded = decodeURIComponent(searchTerm);
  const events: Event[] = await getEvents(searchTermDecoded);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <SectionTitle as="h1">
        Resultados da pesquisa para &quot;{searchTermDecoded}&quot;
      </SectionTitle>
      {events.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum evento encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
