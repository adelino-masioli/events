"use client";

import { AvatarInput } from "@/components/ui/avatar-input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProfileManagement } from "@/hooks/use-profile-management";
import { formatCPF } from "@/utils/format";
import { User } from "lucide-react";

export default function Profile() {
  const {
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
  } = useProfileManagement();

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <Card>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                  <div className="h-10 bg-gray-200 rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
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
              <User className="h-5 w-5" />
              <h1 className="text-2xl font-bold">Perfil</h1>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-sm text-gray-600 mb-6">
              Mantenha suas informações atualizadas para uma melhor experiência.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AvatarInput
                name="avatarUrl"
                value={formData.avatarUrl}
                onChange={handleAvatarChange}
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Primeiro Nome
                  </label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Sobrenome
                  </label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="stateId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Estado
                  </label>
                  <Select
                    value={formData.stateId}
                    onValueChange={handleStateChange}
                    disabled={isLoading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.id} value={state.id}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="cityId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cidade
                  </label>
                  <Select
                    value={formData.cityId}
                    onValueChange={handleCityChange}
                    disabled={isLoading || !formData.stateId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem key={city.id} value={city.id}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="cpf"
                    className="block text-sm font-medium text-gray-700"
                  >
                    CPF
                  </label>
                  <Input
                    id="cpf"
                    name="cpf"
                    type="text"
                    value={formatCPF(formData.cpf || "")}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={(e) => handleCheckboxChange(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <label
                  htmlFor="emailNotifications"
                  className="text-sm text-gray-700"
                >
                  Receber notificações por email
                </label>
              </div>

              {error && (
                <div className="text-sm text-destructive bg-destructive/10 p-3 rounded">
                  {error}
                </div>
              )}

              <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Salvando..." : "Salvar alterações"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
