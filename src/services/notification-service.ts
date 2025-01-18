import { supabase } from "@/lib/supabase/client";

interface Notification {
  id: string;
  title: string;
  message: string;
  status: boolean;
  created_at: string;
  updated_at: string;
}

export const notificationService = {
  async getUserNotifications(): Promise<Notification[]> {
    // Check session first
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error("Session error:", sessionError);
      throw sessionError;
    }

    if (!session) {
      console.error("No session found");
      throw new Error("No session found");
    }

    const { data, error } = await supabase.rpc("get_user_notifications");

    if (error) {
      console.error("Notifications error:", error);
      throw error;
    }
    return data || [];
  },

  async markAsRead(notificationId: string): Promise<void> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("No session found");
    }

    const { error } = await supabase.rpc("mark_notification_as_read", {
      notification_id: notificationId,
    });

    if (error) throw error;
  },

  async markAllAsRead(): Promise<void> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("No session found");
    }

    const { error } = await supabase.rpc("mark_all_notifications_as_read");

    if (error) throw error;
  },

  async getUnreadCount(): Promise<number> {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("No session found");
    }

    const { data, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("status", false)
      .eq("user_id", session.user.id);

    if (error) throw error;
    return data?.length || 0;
  },
};
