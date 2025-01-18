export type UserRole = "admin" | "user" | "organizer";

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string | null;
  cityId?: string | null;
  stateId?: string | null;
  cpf?: string | null;
  emailNotifications: boolean;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export type ProfileFormData = Omit<
  User,
  "id" | "email" | "createdAt" | "updatedAt" | "role"
>;
