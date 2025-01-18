import { MapPin } from "lucide-react";
import React from "react";

interface LocationData {
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
}

export const LocationDisplay: React.FC<LocationData> = ({ location }) => {
  const googleMapsUrl = `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 border-b pb-2">
        Localização
      </h2>

      <div className="space-y-4">
        s<p className="text-lg text-gray-800">{location.address}</p>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
        >
          <MapPin className="w-4 h-4" />
          Ver no Google Maps
        </a>
      </div>
    </div>
  );
};
