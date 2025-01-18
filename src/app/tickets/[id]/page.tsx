import { TicketDetails } from "@/components/ticket-details";

export default function TicketPage() {
  const ticketData = {
    title: "Festival de Verão 2025",
    date: "15 de fevereiro de 2025",
    ticketType: "Ingresso Inteira",
    location: {
      address: "Orla da Praia do Forte, Cabo Frio, RJ, Brasil",
      coordinates: {
        lat: -22.88,
        lng: -42.0,
      },
    },
    value: 250.0,
    purchaseDate: "8 de janeiro de 2025",
    status: "Ativo" as const,
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <TicketDetails {...ticketData} />
    </div>
  );
}
