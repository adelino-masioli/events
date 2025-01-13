import { Event } from "@/types/event";
import { MapPin } from "lucide-react";

interface EventDetailsProps {
  event: Event;
}

export function EventDetails({ event }: EventDetailsProps) {
  const location = event.location.location;
  const coordinates = location.coordinates;
  const googleMapsUrl = coordinates
    ? `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`
    : "#";

  return (
    <div className="rounded-lg border bg-card">
      <div className="p-6">
        <div className="prose prose-stone dark:prose-invert max-w-none">
          <h2>Sobre o evento</h2>
          <p className="mt-4">{event.description}</p>

          <h2 className="mt-7">Local</h2>
          <p className="mt-4">{location.address}</p>
          {coordinates && (
            <p className="mt-2">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline flex gap-2"
              >
                <MapPin />
                Ver no Google Maps
              </a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
