"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { User } from "lucide-react";
import { ChangeEvent, useState } from "react";

interface AvatarInputProps {
  value?: string | null;
  onChange: (value: string) => void;
  className?: string;
  name: string;
}

export function AvatarInput({
  value,
  onChange,
  className,
  name,
}: AvatarInputProps) {
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setError(false);
    onChange(url);
  };

  const getInitials = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.substring(0, 2).toUpperCase();
    } catch {
      return "IMG";
    }
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage
            src={value || ""}
            alt="Avatar"
            onError={() => setError(true)}
          />
          <AvatarFallback>
            {error || !value ? (
              <User className="h-10 w-10 text-muted-foreground" />
            ) : (
              getInitials(value)
            )}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-1">
          <Input
            name={name}
            type="url"
            value={value || ""}
            onChange={handleChange}
            placeholder="https://example.com/avatar.jpg"
            className={cn(error && "border-red-500")}
          />
          {error && (
            <p className="text-xs text-red-500">
              URL inválida ou imagem não encontrada
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Insira a URL de uma imagem para seu avatar
          </p>
        </div>
      </div>
    </div>
  );
}
