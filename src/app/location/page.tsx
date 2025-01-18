import { LocationDisplay } from "@/components/location-display";

export default function LocationPage() {
  const locationData = {
    location: {
      address: "Orla da Praia do Forte, Cabo Frio, RJ, Brasil",
      coordinates: {
        lat: -22.88,
        lng: -42.0,
      },
    },
  };

  return (
    <div className="container mx-auto py-8">
      <LocationDisplay location={locationData.location} />
    </div>
  );
}
