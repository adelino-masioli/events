import Banner from "@/components/layout/banner";
import CityFilterClient from "@/components/layout/city-filter-client";
import { getAllEvents } from "@/lib/getAllEvents";
import { City, Event } from "@/types/event";

export const revalidate = 3600; // revalidate every hour

export default async function Home() {
  const events: Event[] = await getAllEvents();

  const uniqueCities: City[] = Array.from(
    new Set(
      events
        .map((event) => event.city?.name)
        .filter((name): name is string => name !== undefined)
    )
  ).map((cityName) => {
    const event = events.find((event) => event.city?.name === cityName);
    if (event && event.city) {
      return event.city;
    }
    return { name: cityName, state: { name: "", uf: "" } };
  });

  return (
    <div className="flex flex-col gap-8 pb-8">
      {/* Hero Banner Section */}
      <Banner />

      {/* City Filter */}
      <CityFilterClient cities={uniqueCities} events={events} />
    </div>
  );
}
