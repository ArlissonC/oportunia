export type GetBasicCompanyDataByCompanyIdResponse = {
  id: string;
  companyName: string;
  cnpj: string;
  description?: string | null;
  phoneNumber?: string | null;
  logoUrl?: string | null;
  tag: string;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
};

export type UpdateCompanyDataRequest = {
  companyName: string;
  cnpj: string;
  description?: string | null;
  tag: string;
  instagramUrl?: string | null;
  linkedinUrl?: string | null;
};

export type GetCompanyProfileResponse = {
  email: string;
  phoneNumber?: string | null;
  companyName: string;
  description?: string | null;
  cnpj: string;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  logoUrl: string;
  activeVacancies:
    | {
        id: string;
        title: string;
      }[];
};
