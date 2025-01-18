"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { showToast } from "@/lib/toast";
import { cn } from "@/lib/utils";
import { notificationService } from "@/services/notification-service";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Bell, Check, CheckCheck } from "lucide-react";
import { useEffect, useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await notificationService.getUserNotifications();
      setNotifications(data);
    } catch (err) {
      console.error("Error loading notifications:", err);
      setError("Erro ao carregar notificações");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId
            ? { ...notification, status: true }
            : notification
        )
      );
      showToast.success("Notificação marcada como lida");
    } catch (err) {
      showToast.error("Erro ao marcar notificação como lida");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({ ...notification, status: true }))
      );
      showToast.success("Todas as notificações marcadas como lidas");
    } catch (err) {
      showToast.error("Erro ao marcar notificações como lidas");
    }
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
              <Bell className="h-5 w-5" />
              <h1 className="text-2xl font-bold">Notificações</h1>
            </div>
            {notifications.some((n) => !n.status) && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleMarkAllAsRead}
                className="gap-2"
              >
                <CheckCheck className="h-4 w-4" />
                Marcar todas como lidas
              </Button>
            )}
          </CardHeader>
        </Card>

        {error && (
          <div className="bg-red-50 text-red-800 p-4 rounded-lg">{error}</div>
        )}

        {notifications.length === 0 ? (
          <Card>
            <CardContent className="p-6">
              <div className="text-center text-gray-500 py-8">
                <Bell className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p>Você não tem notificações.</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={cn(
                  "transition-colors",
                  !notification.status && "bg-blue-50/50"
                )}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col h-full">
                    <div className="flex-1 space-y-2">
                      <p className="font-medium line-clamp-1">
                        {notification.title}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {notification.message}
                      </p>
                    </div>
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <p className="text-xs text-gray-400">
                        {format(
                          new Date(notification.created_at),
                          "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                          { locale: ptBR }
                        )}
                      </p>
                      {!notification.status && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="shrink-0"
                        >
                          <Check className="h-4 w-4" />
                          <span className="sr-only">Marcar como lida</span>
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
