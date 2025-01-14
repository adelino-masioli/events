"use client";

import { LoginBackground } from "@/components/auth/login-background";
import { LoginSidebar } from "@/components/auth/login-sidebar";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const supabase = createClient();

export default function LoginPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="flex h-screen  bg-[#0c172f]">
      <LoginSidebar onSubmit={handleLogin} error={error} />
      <LoginBackground />
    </div>
  );
}
