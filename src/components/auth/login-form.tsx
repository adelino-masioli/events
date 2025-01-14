"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string;
}

export function LoginForm({ onSubmit, error }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-sm">
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-white mb-1"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          className="bg-transparent text-white border-neutral-600 focus:border-neutral-700 transition focus:ring-0 rounded-md shadow-sm block w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-white mb-1"
        >
          Senha
        </label>
        <Input
          id="password"
          type="password"
          className="bg-transparent text-white border-neutral-600 focus:border-neutral-700 transition focus:ring-0 rounded-md shadow-sm block w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="flex gap-2 mt-4">
        <input
          type="checkbox"
          id="keep_connected"
          className=" relative peer shrink-0 appearance-none w-4 h-4   rounded-sm bg-gray-800 mt-1  checked:bg-gray-600 checked:border-0"
        />
        <label
          htmlFor="keep_connected"
          className="block mt-1 text-xs transition-all text-white/50 hover:text-white/35"
        >
          Manter conectado
        </label>
        <svg
          className="absolute w-4 h-4 mt-1  hidden peer-checked:block text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <div className="flex flex-col mt-5">
        <Button
          type="submit"
          className="flex justify-center items-center w-full p-6 font-normal capitalize min-h-12 px-4 py-2 bg-gray-800 border border-transparent rounded-md text-xs text-white  tracking-widest hover:bg-gray-600 focus:bg-gray-600 active:bg-gray-700  focus:outline-none  focus:ring-0 transition ease-in-out duration-150"
        >
          Entrar
        </Button>
      </div>
    </form>
  );
}
