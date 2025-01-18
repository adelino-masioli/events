"use client";

import { confettiPatterns } from "@/lib/confetti";
import { useEffect, useState } from "react";

interface ConfettiToastProps {
  message: string;
  description?: string;
  pattern?: keyof typeof confettiPatterns;
}

export function ConfettiToast({
  message,
  description,
  pattern = "basic",
}: ConfettiToastProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      setMounted(true);
      confettiPatterns[pattern]();
    }
  }, [mounted, pattern]);

  return (
    <div className="flex flex-col gap-1">
      <p className="font-medium">{message}</p>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
