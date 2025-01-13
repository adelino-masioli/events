"use client";

import EventCard from "@/components/event/event-card";
import { City, Event } from "@/types/event";
import React, { useState } from "react";
import { Badge } from "../ui/badge";
import SectionTitle from "./section-title";

interface CityFilterClientProps {
  cities: City[];
  events: Event[];
}

const CityFilterClient: React.FC<CityFilterClientProps> = ({
  cities,
  events,
}) => {
  const [filteredEvents, setFilteredEvents] = useState(events);

  const handleCitySelect = (cityName: string) => {
    if (cityName === "Todos") {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) => event.city?.name === cityName);
      setFilteredEvents(filtered);
    }
  };

  return (
    <div className="flex flex-col gap-8 pb-8">
      <section className="container px-4 md:px-6">
        <div className="flex items-start justify-between flex-col gap-0">
          <SectionTitle
            as="h2"
            className="text-2xl font-normal tracking-tight mb-6"
          >
            Eventos por Cidade
          </SectionTitle>
          <div className="flex space-x-2 w-full flex-wrap">
            <Badge
              variant="outline"
              className="cursor-pointer px-4 py-2 hover:bg-gray-100"
              onClick={() => handleCitySelect("Todos")}
            >
              Todos
            </Badge>
            {cities.map((city) => (
              <Badge
                key={city.name}
                variant="outline"
                className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                onClick={() => handleCitySelect(city.name)}
              >
                {city.name}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      <section className="container px-4 md:px-6">
        <SectionTitle as="h2" className="text-2xl font-normal tracking-tight">
          Eventos em Destaque
        </SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default CityFilterClient;
