import axios, { AxiosError } from "axios";
import {
  GetBasicCompanyDataByCompanyIdResponse,
  GetCompanyProfileResponse,
  UpdateCompanyDataRequest,
} from "./types";
import { httpClient } from "../httpClient";
import Cookies from "js-cookie";
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const token = Cookies.get("token");
const headers = {
  "Content-Type": "multipart/form-data",
  Authorization: `Bearer ${token}`,
};

enum CompanyRoute {
  CREATE_COMPANY_DATA = "api/company/createCompanyData",
  GET_BASIC_COMPANY_DATA_BY_COMPANY_ID = "api/company/getBasicCompanyDataByCompanyId",
  GET_COMPANY_PROFILE = "api/company/getCompanyProfile",
  UPDATE_COMPANY_DATA = "api/company/updateCompanyData",
  UPDATE_COMPANY_PROFILE_LOGO = "api/company/updateCompanyProfileLogo",
}

const getBasicCompanyDataByCompanyId =
  async (): Promise<GetBasicCompanyDataByCompanyIdResponse> => {
    try {
      const res = await httpClient.get<GetBasicCompanyDataByCompanyIdResponse>(
        CompanyRoute.GET_BASIC_COMPANY_DATA_BY_COMPANY_ID,
      );
      const data: GetBasicCompanyDataByCompanyIdResponse = res.data;
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }

      throw error;
    }
  };

const getCompanyProfile = async (
  companyTag: string,
): Promise<GetCompanyProfileResponse> => {
  try {
    const res = await httpClient.get<GetCompanyProfileResponse>(
      `${CompanyRoute.GET_COMPANY_PROFILE}/${companyTag}`,
    );
    const data: GetCompanyProfileResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const createCompanyData = async (param: FormData): Promise<string> => {
  try {
    const res = await axios.post<string>(
      `${baseURL}${CompanyRoute.CREATE_COMPANY_DATA}`,
      param,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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

const updateCompanyData = async (
  params: UpdateCompanyDataRequest,
): Promise<string> => {
  try {
    const res = await httpClient.put<string>(
      CompanyRoute.UPDATE_COMPANY_DATA,
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

const updateCompanyProfileLogo = async (params: FormData): Promise<string> => {
  try {
    const res = await axios.put<string>(
      `${baseURL}${CompanyRoute.UPDATE_COMPANY_PROFILE_LOGO}`,
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

export const companyService = {
  getCompanyProfile,
  createCompanyData,
  getBasicCompanyDataByCompanyId,
  updateCompanyData,
  updateCompanyProfileLogo,
};
