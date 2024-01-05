import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import {
  CreateVacancyRequest,
  DisqualifyCandidateRequest,
  GetCompanyVacancyToEdditionResponse,
  GetVacanciesResponse,
  GetVacancyByIdResponse,
  UpdateVacancyRequest,
  Vacancy,
} from "./types";

enum VacancyRoute {
  GET_COMPANY_VACANCIES = "api/vacancy/getCompanyVacancies",
  GET_VACANCY_BY_ID = "api/vacancy/getVacancyById",
  GET_VACANCIES = "api/vacancy/getVacancies",
  GET_COMPANY_VACANCY_TO_EDDITION = "api/vacancy/getCompanyVacancyToEddition",
  CREATE_VACANCY = "api/vacancy/createVacancy",
  UPDATE_VACANCY = "api/vacancy/updateVacancy",
  APPLY_TO_VACANCY = "api/vacancy/applyToVacancy",
  DISQUALIFY_CANDIDATE = "api/vacancy/disqualifyCandidate",
  CLOSE_VACANCY = "api/vacancy/closeVacancy",
}

const getCompanyVacancies = async (): Promise<Vacancy[]> => {
  try {
    const res = await httpClient.get<Vacancy[]>(
      VacancyRoute.GET_COMPANY_VACANCIES,
    );
    const data: Vacancy[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const getCompanyVacancyToEddition = async (
  vacancyId: string,
): Promise<GetCompanyVacancyToEdditionResponse> => {
  try {
    const res = await httpClient.get<GetCompanyVacancyToEdditionResponse>(
      `${VacancyRoute.GET_COMPANY_VACANCY_TO_EDDITION}/${vacancyId}`,
    );
    const data: GetCompanyVacancyToEdditionResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const getVacancies = async (
  curentPage: number,
  search: string | null,
): Promise<GetVacanciesResponse[]> => {
  try {
    const res = await httpClient.get<GetVacanciesResponse[]>(
      `${VacancyRoute.GET_VACANCIES}?${
        search && `search=${search}`
      }&currentPage=${curentPage}`,
    );
    const data: GetVacanciesResponse[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const getVacancyById = async (
  vacancyId: string,
): Promise<GetVacancyByIdResponse> => {
  try {
    const res = await httpClient.get<GetVacancyByIdResponse>(
      `${VacancyRoute.GET_VACANCY_BY_ID}/${vacancyId}`,
    );
    const data: GetVacancyByIdResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const createVacancy = async (params: CreateVacancyRequest): Promise<string> => {
  try {
    const res = await httpClient.post<string>(
      VacancyRoute.CREATE_VACANCY,
      params,
    );
    const data: string = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const applyToVacancy = async (vacancyId: string): Promise<string> => {
  try {
    const res = await httpClient.post<string>(VacancyRoute.APPLY_TO_VACANCY, {
      vacancyId,
    });
    const data: string = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const updateVacancy = async (params: UpdateVacancyRequest): Promise<string> => {
  try {
    const res = await httpClient.put<string>(
      VacancyRoute.UPDATE_VACANCY,
      params,
    );
    const data: string = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const disqualifyCandidate = async (
  params: DisqualifyCandidateRequest,
): Promise<string> => {
  try {
    const res = await httpClient.put<string>(
      VacancyRoute.DISQUALIFY_CANDIDATE,
      params,
    );
    const data: string = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const closeVacancy = async (vacancyId: string): Promise<string> => {
  try {
    const res = await httpClient.put<string>(
      `${VacancyRoute.CLOSE_VACANCY}/${vacancyId}`,
    );
    const data: string = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

export const vacancyService = {
  getVacancies,
  getVacancyById,
  getCompanyVacancies,
  createVacancy,
  getCompanyVacancyToEddition,
  updateVacancy,
  applyToVacancy,
  disqualifyCandidate,
  closeVacancy,
};
