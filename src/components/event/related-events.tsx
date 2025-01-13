"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

interface Event {
  id: string;
  name: string;
  date: string;
  city: {
    name: string;
    state: {
      uf: string;
    };
  };
  image: string;
}

export function RelatedEvents() {
  const [relatedEvents, setRelatedEvents] = useState<Event[]>([]);

  useEffect(() => {
    async function fetchRelatedEvents() {
      const supabase = createClient();

      const { data: events, error } = await supabase
        .from("events")
        .select(
          `
          id,
          name,
          date,
          location,
          thumbnail_url,
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
        .order("date", { ascending: false }) // Ordena pela data mais recente
        .limit(5); // Limita a 4 eventos

      if (error) {
        console.error("Error fetching related events:", error);
        return;
      }

      setRelatedEvents(
        events.map((event) => ({
          id: event.id,
          name: event.name,
          date: event.date,
          city: {
            name: event.city?.name,
            state: {
              uf: event.city?.state?.uf,
            },
          },
          image: event.thumbnail_url,
        }))
      );
    }

    fetchRelatedEvents();
  }, []);

  return (
    <section className="container py-20">
      <h2 className="mb-8 text-3xl font-bold tracking-tight">Outros eventos</h2>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
        {relatedEvents.map((event) => (
          <Link key={event.id} href={`/event/${event.id}`}>
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="aspect-[4/3] relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${event.image})` }}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="line-clamp-1">{event.name}</CardTitle>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {event.city?.name}, {event.city?.state?.uf}
                </p>
                <p className="text-sm font-normal">
                  {format(new Date(event.date), "dd 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full" variant="outline">
                  Ver Detalhes
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}
