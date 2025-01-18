export const formatCPF = (cpf: string) => {
  const cleaned = cpf.replace(/\D/g, "");
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
};

export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString("pt-BR");
};
