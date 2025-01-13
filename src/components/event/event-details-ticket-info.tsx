import { Event } from "@/types/event";

interface TicketInfoProps {
  event: Event;
}

const TicketInfo: React.FC<TicketInfoProps> = ({ event }) => {
  return (
    <div className="rounded-lg border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold">Ingressos</h3>
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Inteira</span>
          <span className="font-medium">R$ {event.prices.full}</span>
        </div>
        <div className="flex justify-between">
          <span>Meia</span>
          <span className="font-medium">R$ {event.prices.half}</span>
        </div>
        {event.prices.child === 0 ? (
          <div className="flex justify-between">
            <span>Criança até 12 anos</span>
            <span className="font-medium">Grátis</span>
          </div>
        ) : (
          <div className="flex justify-between">
            <span>Criança</span>
            <span className="font-medium">R$ {event.prices.child}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketInfo;
