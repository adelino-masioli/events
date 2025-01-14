import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";

interface LoginSidebarProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  error?: string;
}

export function LoginSidebar({ onSubmit, error }: LoginSidebarProps) {
  return (
    <div className="w-full md:w-1/4 flex flex-col justify-center items-start p-8">
      <Image src="/logo.svg" alt="Logo" width={134} height={28} />
      <h1 className="text-xl font-medium text-white">Acesso para clientes</h1>
      <p className="mt-2 mb-2 text-sm font-normal text-white">
        Digite seu e-mail e a mesma senha usados para acessar a conta Dionor.
      </p>
      <LoginForm onSubmit={onSubmit} error={error} />
      <div className="mt-4 flex flex-col justify-end w-full max-w-sm">
        <Link
          href="/sign-up"
          className="mt-5 text-xs text-right transition-all text-[#9ee840] hover:text-white/35"
        >
          Registre-se
        </Link>
        <Link
          href="/forgot-password"
          className="mt-5 text-xs text-right transition-all text-[#9ee840] hover:text-white/35"
        >
          Esqueceu sua senha?
        </Link>
      </div>
    </div>
  );
}
