export type ProfessionalExperience = {
  id: string;
  jobPosition: string;
  description: string;
  company: string;
  startDate: string;
  endDate?: string | null;
  [key: string]: string | number | boolean | undefined | null;
};

export type CandidateData = {
  id: string;
  jobPosition: string;
  presentation?: string | null;
  salaryExpectation?: string | null;
  linkedinUrl?: string | null;
  instagramUrl?: string | null;
  portfolioUrl?: string | null;
  gitHubUrl?: string | null;
  curriculum?: string | null;
  photo?: string | null;
  level: number;
};

export type GetCandidateProfileResponse = {
  candidate: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  professionalExperiences: ProfessionalExperience[];
  candidateData: CandidateData;
  address: {
    id: string;
    cep: string;
    state: string;
    city: string;
    street: string;
    neighborhood: string;
    number: string;
  };
};

export enum CandidateLevel {
  Junior,
  Pleno,
  Senior,
}

export type GetBasicCandidateDataResponse = {
  id: string;
  jobPosition: string;
  presentation: string;
  salaryExpectation?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  portfolioUrl?: string;
  gitHubUrl?: string;
  photoUrl?: string;
  curriculumUrl?: string;
  tag: string;
  level: number;
  phoneNumber: string;
};

export type GetVacanciesCandidateResponse = {
  id: string;
  title: string;
  disqualified: boolean;
};
