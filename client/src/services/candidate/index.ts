import axios, { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import {
  GetBasicCandidateDataResponse,
  GetCandidateProfileResponse,
  GetVacanciesCandidateResponse,
  ProfessionalExperience,
} from "./types";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("token");
const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${token}`,
};

enum CandidateRoute {
  CREATE_CANDIDATE_DATA = "api/candidate/createCandidateData",
  GET_CANDIDATE_PROFESSIONAL_EXPERIENCES = "api/candidate/getCandidateProfessionalExperiences",
  GET_VACANCIES_CANDIDATE = "api/candidate/getVacanciesCandidate",
  GET_PROFESSIONAL_EXPERIENCE_BY_ID = "api/candidate/getProfessionalExperienceById",
  UPDATE_CANDIDATE_DATA = "api/candidate/updateCandidateData",
  GET_CANDIDATE_PROFILE = "api/candidate/getCandidateProfile",
  GET_BASIC_CANDIDATE_DATA = "api/candidate/getBasicCandidateData",
  CREATE_CANDIDATE_PROFESSIONAL_EXPERIENCE = "api/candidate/createCandidateProfessionalExperience",
  UPDATE_CANDIDATE_PROFESSIONAL_EXPERIENCE = "api/candidate/updateCandidateProfessionalExperience",
  DELETE_CANDIDATE_PROFESSIONAL_EXPERIENCE = "api/candidate/deleteCandidateProfessionalExperience",
  WITHDRAW_APPLICATION_VACANCY = "api/candidate/withdrawApplicationVacancy",
  UPDATE_CANDIDATE_PROFILE_PHOTO = "api/candidate/updateCandidateProfilePhoto",
}

const getBasicCandidateData =
  async (): Promise<GetBasicCandidateDataResponse> => {
    try {
      const res = await httpClient.get<GetBasicCandidateDataResponse>(
        CandidateRoute.GET_BASIC_CANDIDATE_DATA,
      );
      const data: GetBasicCandidateDataResponse = res.data;
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw error;
    }
  };

const getCandidateProfessionalExperiences = async (): Promise<
  ProfessionalExperience[]
> => {
  try {
    const res = await httpClient.get<ProfessionalExperience[]>(
      CandidateRoute.GET_CANDIDATE_PROFESSIONAL_EXPERIENCES,
    );
    const data: ProfessionalExperience[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const getProfessionalExperienceById = async (
  id: string,
): Promise<ProfessionalExperience> => {
  try {
    const res = await httpClient.get<ProfessionalExperience>(
      `${CandidateRoute.GET_PROFESSIONAL_EXPERIENCE_BY_ID}/${id}`,
    );
    const data: ProfessionalExperience = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const getVacanciesCandidate = async (): Promise<
  GetVacanciesCandidateResponse[]
> => {
  try {
    const res = await httpClient.get<GetVacanciesCandidateResponse[]>(
      CandidateRoute.GET_VACANCIES_CANDIDATE,
    );
    const data: GetVacanciesCandidateResponse[] = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const createCandidateProfessionalExperience = async (
  params: ProfessionalExperience,
): Promise<string> => {
  try {
    const res = await httpClient.post<string>(
      CandidateRoute.CREATE_CANDIDATE_PROFESSIONAL_EXPERIENCE,
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

const updateCandidateProfessionalExperience = async (
  params: ProfessionalExperience,
): Promise<string> => {
  try {
    const res = await httpClient.put<string>(
      CandidateRoute.UPDATE_CANDIDATE_PROFESSIONAL_EXPERIENCE,
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

const createCandidateData = async (param: FormData): Promise<string> => {
  try {
    const res = await axios.post<string>(
      `${baseURL}${CandidateRoute.CREATE_CANDIDATE_DATA}`,
      param,
      {
        headers,
      },
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

const updateCandidateProfilePhoto = async (
  params: FormData,
): Promise<string> => {
  try {
    const res = await axios.put<string>(
      `${baseURL}${CandidateRoute.UPDATE_CANDIDATE_PROFILE_PHOTO}`,
      params,
      {
        headers,
      },
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

const updateCandidateData = async (params: FormData): Promise<string> => {
  try {
    const res = await axios.put<string>(
      `${baseURL}${CandidateRoute.UPDATE_CANDIDATE_DATA}`,
      params,
      {
        headers,
      },
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

const getCandidateProfile = async (
  tag: string,
): Promise<GetCandidateProfileResponse> => {
  try {
    const res = await httpClient.get<GetCandidateProfileResponse>(
      `${CandidateRoute.GET_CANDIDATE_PROFILE}/${tag}`,
    );
    const data: GetCandidateProfileResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const deleteCandidateProfessionalExperience = async (
  id: string,
): Promise<string> => {
  try {
    const res = await httpClient.del<string>(
      `${CandidateRoute.DELETE_CANDIDATE_PROFESSIONAL_EXPERIENCE}/${id}`,
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

const withdrawApplicationVacancy = async (
  vacancyId: string,
): Promise<string> => {
  try {
    const res = await httpClient.del<string>(
      `${CandidateRoute.WITHDRAW_APPLICATION_VACANCY}/${vacancyId}`,
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

export const candidateService = {
  getCandidateProfessionalExperiences,
  updateCandidateProfessionalExperience,
  createCandidateProfessionalExperience,
  getCandidateProfile,
  createCandidateData,
  getBasicCandidateData,
  updateCandidateData,
  getProfessionalExperienceById,
  deleteCandidateProfessionalExperience,
  getVacanciesCandidate,
  withdrawApplicationVacancy,
  updateCandidateProfilePhoto,
};
