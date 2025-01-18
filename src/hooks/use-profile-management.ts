import { useAuth } from "@/contexts/auth-context";
import { locationService } from "@/services/location-service";
import { userService } from "@/services/user-service";
import { City, State } from "@/types/location";
import { ProfileFormData } from "@/types/user";
import { useEffect, useState } from "react";

export function useProfileManagement() {
  const { updateUser } = useAuth();
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialLoad, setInitialLoad] = useState(true);

  const [formData, setFormData] = useState<ProfileFormData>({
    firstName: "",
    lastName: "",
    avatarUrl: "",
    cityId: "",
    stateId: "",
    cpf: "",
    emailNotifications: true,
  });

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);

        const profile = await userService.getProfile();

        const statesData = await locationService.getStates();
        setStates(statesData);

        if (profile.stateId) {
          const citiesData = await locationService.getCitiesByState(
            profile.stateId
          );
          setCities(citiesData);
        }

        setFormData({
          firstName: profile.firstName,
          lastName: profile.lastName,
          avatarUrl: profile.avatarUrl ?? "",
          stateId: profile.stateId ?? "",
          cityId: profile.cityId ?? "",
          cpf: profile.cpf ?? "",
          emailNotifications: profile.emailNotifications,
        });
      } catch (err) {
        console.error("Error initializing profile:", err);
        setError("Erro ao carregar dados do perfil");
      } finally {
        setIsLoading(false);
        setInitialLoad(false);
      }
    };

    initialize();
  }, []);

  useEffect(() => {
    const loadCities = async () => {
      if (initialLoad) return;

      if (!formData.stateId) {
        setCities([]);
        setFormData((prev) => ({ ...prev, cityId: "" }));
        return;
      }

      try {
        setIsLoading(true);
        const data = await locationService.getCitiesByState(formData.stateId);
        setCities(data);
      } catch (err) {
        console.error("Error loading cities:", err);
        setError("Erro ao carregar cidades");
      } finally {
        setIsLoading(false);
      }
    };

    loadCities();
  }, [formData.stateId, initialLoad]);

  const handleStateChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      stateId: value,
      cityId: "",
    }));
  };

  const handleCityChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      cityId: value,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const updatedProfile = await userService.updateProfile(formData);
      await updateUser(updatedProfile);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("Erro ao atualizar perfil");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAvatarChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      avatarUrl: value,
    }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      emailNotifications: checked,
    }));
  };

  return {
    states,
    cities,
    formData,
    isLoading,
    error,
    handleInputChange,
    handleStateChange,
    handleCityChange,
    handleSubmit,
    handleAvatarChange,
    handleCheckboxChange,
  };
}
