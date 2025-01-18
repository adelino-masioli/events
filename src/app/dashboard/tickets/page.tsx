"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { showToast } from "@/lib/toast";
import { ticketService } from "@/services/ticket-service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Copy, MapPin, Navigation, Ticket as TicketIcon } from "lucide-react";
import { useEffect, useState } from "react";

interface Location {
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
}

interface Ticket {
  id: string;
  event: {
    id: string;
    name: string;
    date: string;
    end_date: string;
    location: string | Location;
  };
  ticket_type: {
    id: string;
    name: string;
    price: number;
  };
  status:
    | "active"
    | "inactive"
    | "pending"
    | "confirmed"
    | "used"
    | "cancelled";
  created_at: string;
}

const ITEMS_PER_PAGE = 9;

export default function Tickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const loadTickets = async () => {
      try {
        const data = await ticketService.getUserTickets();
        setTickets(data);
      } catch (err) {
        console.error("Error loading tickets:", err);
        setError("Erro ao carregar tickets");
      } finally {
        setIsLoading(false);
      }
    };

    loadTickets();
  }, []);

  const getStatusColor = (status: Ticket["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusText = (status: Ticket["status"]) => {
    switch (status) {
      case "active":
        return "Ativo";
      case "inactive":
        return "Inativo";
      case "confirmed":
        return "Confirmado";
      case "used":
        return "Utilizado";
      case "cancelled":
        return "Cancelado";
      case "pending":
        return "Pendente";
      default:
        return status;
    }
  };

  const formatLocation = (location: string | Location) => {
    if (typeof location === "string") {
      try {
        const parsedLocation = JSON.parse(location);
        return parsedLocation.location.address;
      } catch {
        return location;
      }
    }
    return location.address;
  };

  const getGoogleMapsUrl = (location: string | Location) => {
    if (typeof location === "string") {
      try {
        const parsedLocation = JSON.parse(location);
        const coordinates = parsedLocation.location.coordinates;
        return `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}`;
      } catch {
        return "#";
      }
    }
    return `https://www.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}`;
  };

  const copyCoordinates = async (location: string | Location) => {
    if (typeof location === "string") {
      try {
        const parsedLocation = JSON.parse(location);
        const coordinates = parsedLocation.location.coordinates;
        await navigator.clipboard.writeText(
          `${coordinates.lat}, ${coordinates.lng}`
        );
        showToast.success("Coordenadas copiadas para a área de transferência", {
          duration: 2000,
        });
      } catch (error) {
        showToast.error("Erro ao copiar coordenadas");
      }
      return;
    }

    try {
      await navigator.clipboard.writeText(
        `${location.coordinates.lat}, ${location.coordinates.lng}`
      );
      showToast.success("Coordenadas copiadas para a área de transferência", {
        duration: 2000,
      });
    } catch (error) {
      showToast.error("Erro ao copiar coordenadas");
    }
  };

  const getDirectionsUrl = (location: string | Location) => {
    if (typeof location === "string") {
      try {
        const parsedLocation = JSON.parse(location);
        const coordinates = parsedLocation.location.coordinates;
        return `https://www.google.com/maps/dir/?api=1&destination=${coordinates.lat},${coordinates.lng}`;
      } catch {
        return "#";
      }
    }
    return `https://www.google.com/maps/dir/?api=1&destination=${location.coordinates.lat},${location.coordinates.lng}`;
  };

  const totalPages = Math.ceil(tickets.length / ITEMS_PER_PAGE);
  const paginatedTickets = tickets.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    showToast.info(`Página ${newPage} de ${totalPages}`, {
      duration: 1500,
    });
  };

  const hasCoordinates = (location: string | Location) => {
    if (typeof location === "string") {
      try {
        const parsedLocation = JSON.parse(location);
        return !!parsedLocation.location.coordinates;
      } catch {
        return false;
      }
    }
    return !!location.coordinates;
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[200px]">
                <CardContent className="p-6">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                    <div className="h-20 bg-gray-200 rounded" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <Card>
          <CardHeader className="flex-row justify-between items-center space-y-0">
            <div className="flex items-center gap-2">
              <TicketIcon className="h-5 w-5" />
              <h1 className="text-2xl font-bold">Meus Ingressos</h1>
            </div>
            <Badge variant="outline" className="gap-1">
              <TicketIcon className="h-4 w-4" />
              {tickets.length} {tickets.length === 1 ? "ingresso" : "ingressos"}
            </Badge>
          </CardHeader>
        </Card>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">{error}</div>
        )}

        {tickets.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500 py-8">
                <TicketIcon className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>Você não tem ingressos.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedTickets.map((ticket) => (
              <Card key={ticket.id}>
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <h2 className="font-medium line-clamp-1">
                          {ticket.event.name}
                        </h2>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusText(ticket.status)}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {format(
                          new Date(ticket.event.date),
                          "EEEE, dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                          {
                            locale: ptBR,
                          }
                        )}
                      </p>
                      {hasCoordinates(ticket.event.location) && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 shrink-0" />
                          <p className="line-clamp-1">
                            {formatLocation(ticket.event.location)}
                          </p>
                        </div>
                      )}
                    </div>
                    {hasCoordinates(ticket.event.location) && (
                      <div className="mt-4 pt-4 border-t flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyCoordinates(ticket.event.location)}
                        >
                          <Copy className="h-4 w-4" />
                          <span className="sr-only">Copiar coordenadas</span>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={getGoogleMapsUrl(ticket.event.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <MapPin className="h-4 w-4" />
                            <span className="sr-only">Ver no mapa</span>
                          </a>
                        </Button>
                        <Button variant="ghost" size="sm" asChild>
                          <a
                            href={getDirectionsUrl(ticket.event.location)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Navigation className="h-4 w-4" />
                            <span className="sr-only">Como chegar</span>
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
