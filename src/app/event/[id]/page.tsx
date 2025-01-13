import { AddToCartButton } from "@/components/event/add-to-cart-button";
import { EventDetails } from "@/components/event/event-details";
import { EventHero } from "@/components/event/event-hero";
import { PurchaseButton } from "@/components/event/purchase-button";
import { RelatedEvents } from "@/components/event/related-events";
import { getEvent } from "@/lib/supabase/get-event";
import { Event } from "@/types/event";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: PageProps) {
  const { id } = await params;

  if (!id) {
    return notFound();
  }

  const event: Event | null = await getEvent(id);

  if (!event) {
    return notFound();
  }

  return (
    <div className="relative">
      <EventHero name={event.name} date={event.date} image={event.banner_url} />

      <div className="container relative z-10 -mt-16 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <EventDetails event={event} />
          </div>
          <div className="space-y-8">
            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Ingressos</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Inteira</span>
                  <span className="font-medium">R$ {event.prices.full}</span>
                  <AddToCartButton type="full" price={event.prices.full} />
                </div>
                <div className="flex justify-between items-center">
                  <span>Meia</span>
                  <span className="font-medium">R$ {event.prices.half}</span>
                  <AddToCartButton type="half" price={event.prices.half} />
                </div>
                {event.prices.child !== 0 && (
                  <div className="flex justify-between items-center">
                    <span>Criança</span>
                    <span className="font-medium">R$ {event.prices.child}</span>
                    <AddToCartButton type="child" price={event.prices.child} />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <h3 className="mb-4 text-lg font-semibold">Organizador</h3>
              <div className="space-y-2">
                <p>{event.organizer.name}</p>
                <p>
                  <a
                    href={`mailto:${event.organizer.email}`}
                    className="text-primary hover:underline"
                  >
                    {event.organizer.email}
                  </a>
                </p>
                <p>
                  <a
                    href={`tel:${event.organizer.phone}`}
                    className="text-primary hover:underline"
                  >
                    {event.organizer.phone}
                  </a>
                </p>
                <p>
                  <a
                    href={`https://wa.me/${event.organizer.whatsapp.replace(
                      /\D/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    WhatsApp
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <RelatedEvents />
      <PurchaseButton />
    </div>
  );
}
