import { useAuth } from "@/contexts/auth-context";
import { userService } from "@/services/user-service";
import { ProfileFormData } from "@/types/user";
import { useState } from "react";

export function useProfileForm() {
  const { updateUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: ProfileFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const updatedUser = await userService.updateProfile(data);
      await updateUser(updatedUser);
    } catch (err) {
      setError("Erro ao atualizar perfil");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, handleSubmit };
}
