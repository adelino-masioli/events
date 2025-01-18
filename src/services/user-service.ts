import { supabase } from "@/lib/supabase/client";
import { ProfileFormData, User } from "@/types/user";

const mapUser = (data: any, email: string): User => ({
  id: data.id,
  firstName: data.first_name,
  lastName: data.last_name,
  email,
  avatarUrl: data.avatar_url,
  cityId: data.city_id,
  stateId: data.state_id,
  cpf: data.cpf,
  emailNotifications: data.email_notifications,
  role: data.role,
  createdAt: data.created_at,
  updatedAt: data.updated_at,
});

const mapProfileDataToDb = (data: ProfileFormData) => ({
  first_name: data.firstName,
  last_name: data.lastName,
  avatar_url: data.avatarUrl,
  city_id: data.cityId,
  state_id: data.stateId,
  cpf: data.cpf,
  email_notifications: data.emailNotifications,
});

export const userService = {
  async getProfile(): Promise<User> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("No user session found");
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          `
          id,
          first_name,
          last_name,
          avatar_url,
          city_id,
          state_id,
          cpf,
          email_notifications,
          role,
          created_at,
          updated_at
        `
        )
        .eq("id", session.session.user.id)
        .single();

      if (error) {
        console.error("Database error:", error);
        throw new Error("Failed to fetch profile");
      }
      if (!data) throw new Error("Profile not found");

      return mapUser(data, session.session.user.email);
    } catch (error) {
      console.error("Error fetching profile:", error);
      throw error;
    }
  },

  async updateProfile(formData: ProfileFormData): Promise<User> {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session?.session?.user) {
        throw new Error("No user session found");
      }

      const { data: updatedUser, error } = await supabase
        .from("profiles")
        .update(mapProfileDataToDb(formData))
        .eq("id", session.session.user.id)
        .select(
          `
          id,
          first_name,
          last_name,
          avatar_url,
          city_id,
          state_id,
          cpf,
          email_notifications,
          role,
          created_at,
          updated_at
        `
        )
        .single();

      if (error) {
        console.error("Database error:", error);
        throw new Error("Failed to update profile");
      }
      if (!updatedUser) throw new Error("Profile not found after update");

      return mapUser(updatedUser, session.session.user.email);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },
};
