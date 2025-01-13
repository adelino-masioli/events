"use client";

import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  name: string;
  description: string;
  banner_url: string;
}

const Banner: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Função para buscar eventos destacados
    const fetchFeaturedEvents = async () => {
      try {
        const supabase = createClient();

        const { data, error } = await supabase
          .from("events")
          .select("id, name, description, banner_url")
          .eq("is_featured", true);

        if (error) {
          console.error("Erro ao buscar eventos destacados:", error);
          return;
        }

        setEvents(data);
      } catch (error) {
        console.error("Erro na consulta:", error);
      }
    };

    fetchFeaturedEvents();
  }, []);

  const handleSearch = () => {
    router.push(`/events/${encodeURIComponent(searchTerm)}`);
  };

  if (events.length === 0) {
    // Caso não haja eventos ou esteja carregando
    return (
      <section className="w-full h-[60vh] md:h-[80vh] relative flex items-center justify-center text-center bg-gray-200">
        <div className="container px-4 md:px-6 text-white">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Carregando eventos destacados...
          </h1>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full relative">
      <Carousel>
        <CarouselContent>
          {events.map((event) => (
            <CarouselItem key={event.id}>
              <div
                className="w-full h-[60vh] md:h-[80vh] relative"
                style={{
                  backgroundImage: `url(${event.banner_url})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-center">
                  <div className="container px-4 md:px-6 text-white">
                    <h1 className="text-3xl font-normal sm:text-4xl md:text-5xl lg:text-6xl">
                      {event.name}
                    </h1>
                    <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl">
                      {event.description}
                    </p>
                    <div className="w-full max-w-sm mt-10 mx-auto">
                      <div className="flex space-x-2">
                        <Input
                          placeholder="Pesquisar eventos..."
                          className="text-black"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Button type="button" onClick={handleSearch}>
                          Buscar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </section>
  );
};

export default Banner;
