import { cn } from "@/lib/utils"; // Assumindo que você tem uma função utilitária para concatenar classes
import React from "react";

interface SectionTitleProps {
  children: React.ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className,
  as: Tag = "h2",
}) => {
  return (
    <Tag
      className={cn(
        "text-3xl font-semibold tracking-tight mb-8 text-left",
        className
      )}
    >
      {children}
    </Tag>
  );
};

export default SectionTitle;
