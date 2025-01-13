"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Event } from "@/types/event";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const [formattedDate, setFormattedDate] = useState<string>("");

  useEffect(() => {
    setFormattedDate(
      format(new Date(event.date), "dd 'de' MMMM", { locale: ptBR })
    );
  }, [event.date]);

  return (
    <Link key={event.id} href={`/event/${event.id}`}>
      <Card className="overflow-hidden">
        <CardHeader className="p-0">
          <div className="aspect-[4/3] relative">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${event.thumbnail_url})` }}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="line-clamp-1">{event.name}</CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {event.city?.name}, {event.city?.state?.uf}
          </p>
          <p className="text-sm font-normal">{formattedDate}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Button className="w-full" variant="outline">
            Ver Detalhes
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default EventCard;
