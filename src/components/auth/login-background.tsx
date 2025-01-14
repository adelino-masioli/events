export function LoginBackground() {
  return (
    <div
      className="hidden md:flex items-center justify-end w-[90%] h-screen bg-no-repeat bg-contain relative "
      style={{
        backgroundImage: "url('/bg-login.webp')",
        backgroundPosition: "right top",
        backgroundSize: "90%",
      }}
    >
      <div className="w-1/2 text-white relative z-10 p-8">
        <h2 className="mb-4 text-3xl font-normal">
          <span className="text-[#9ee840]">#</span>segurança
        </h2>
        <h3 className="mb-2 text-lg">Fique atento!</h3>
        <ul className="px-10 mt-4 text-sm list-disc list-outside marker:text-[#9ee840] w-2/3">
          <li className="leading-6">
            Nenhum recurso da sua conta é habilitado por meio de contato nas
            redes sociais.
          </li>
          <li className="mt-2 leading-6">
            Nunca divulgue suas senhas de acesso, confirme e-mails recebidos por
            qualquer meio ou clique em links de fontes não oficiais.
          </li>
        </ul>
        <a href="https://dionor.com.br" className="text-[#9ee840] mt-4 flex">
          Descubra mais sobre como se proteger &gt;
        </a>
      </div>
    </div>
  );
}
