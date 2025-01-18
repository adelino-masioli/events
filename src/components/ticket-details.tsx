import { LocationDisplay } from "@/components/location-display";
import { Badge } from "@/components/ui/badge";

interface TicketDetailsProps {
  title: string;
  date: string;
  ticketType: string;
  location: {
    address: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  value: number;
  purchaseDate: string;
  status: "Ativo" | "Inativo";
}

export function TicketDetails({
  title,
  date,
  ticketType,
  location,
  value,
  purchaseDate,
  status,
}: TicketDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600">{date}</p>
        </div>
        <Badge
          variant={status === "Ativo" ? "default" : "secondary"}
          className={status === "Ativo" ? "bg-green-500" : ""}
        >
          {status}
        </Badge>
      </div>

      <div className="grid gap-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">
            Tipo de Ingresso
          </h2>
          <p className="text-base text-gray-900">{ticketType}</p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Endereço</h2>
          <LocationDisplay
            location={{
              address: location.address,
              coordinates: location.coordinates,
            }}
          />
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">Valor</h2>
          <p className="text-base text-gray-900">
            {new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(value)}
          </p>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-1">
            Data da Compra
          </h2>
          <p className="text-base text-gray-900">{purchaseDate}</p>
        </div>
      </div>
    </div>
  );
}
