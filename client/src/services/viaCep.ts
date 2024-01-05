import { httpClient } from "./httpClient";

export type ViaCepResponse = {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string; // Cidade
  uf: string; // Estado
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
};

export const viaCep = async (cep: string) => {
  const res = await httpClient.get(`https://viacep.com.br/ws/${cep}/json/`);

  return res.data as ViaCepResponse;
};
