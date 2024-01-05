export type CreateVacancyRequest = {
  area: number;
  level: number;
  type: number;
  modality: number;
  location?: string | null;
  salary?: number | null;
  title: string;
  description: string;
  responsibilities?: string | null;
  essential?: string | null;
  differential?: string | null;
  benefits?: string | null;
};

export type Vacancy = {
  id: string;
  area: number;
  level: number;
  type: number;
  modality: number;
  salary?: number | null;
  location?: string | null;
  title: string;
  description?: string | null;
  benefits?: string | null;
  responsibilities?: string | null;
  essential?: string | null;
  differential?: string | null;
  userCreatedOrAppliedVacancy: boolean;
  createdAt: string;
};

export type GetCompanyVacancyToEdditionResponse = {
  vacancy: Vacancy;
  candidates: {
    id: string;
    name: string;
    email: string;
    jobPosition: string;
    tag: string;
  }[];
};

export type UpdateVacancyRequest = {
  vacancyId: string;
  area: number;
  level: number;
  type: number;
  modality: number;
  salary?: number | null;
  location?: string | null;
  title: string;
  description?: string | null;
  benefits?: string | null;
  responsibilities?: string | null;
  essential?: string | null;
  differential?: string | null;
};

export enum VacancyType {
  PJ,
  CLT,
}

export enum VacancyLevel {
  "Junior",
  "Pleno",
  "Senior",
}

export enum VacancyModality {
  "Híbrido",
  "Home Office",
  "Presencial",
}

export enum VacancyArea {
  "Desenvolvimento",
  "Dados",
  "Infraestrutura",
  "DevOps",
  "Suporte Técnico",
  "Inteligência Artificial",
}

export type GetVacanciesResponse = {
  id: string;
  type: number;
  createdAt: string;
  title: string;
  salary?: number | null;
  modality: number;
  location: string;
  area: number;
  companyName: string;
  userCreatedOrAppliedVacancy: boolean;
};

export type GetVacancyByIdResponse = {
  id: string;
  companyTag: string;
  title: string;
  companyName: string;
  description?: string | null;
  benefits?: string | null;
  responsibilities?: string | null;
  essential?: string | null;
  differential?: string | null;
  modality: number;
  userCreatedOrAppliedVacancy: boolean;
};

export type DisqualifyCandidateRequest = {
  candidateId: string;
  vacancyId: string;
};
