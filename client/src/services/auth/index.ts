import {
  ChangeUserPasswordRequest,
  ForgotPasswordResponse,
  Me,
  RegisterRequest,
  RegisterResponse,
  ResetUserPasswordRequest,
  ResetUserPasswordResponse,
  SignInRequest,
  SignInResponse,
} from "./types";
import { AxiosError } from "axios";
import axios from "axios";
import Cookies from "js-cookie";

const authenticationApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTHENTICATION_BASE_URL,
});

enum AuthRoute {
  LOGIN = "authentication/login",
  REGISTER = "authentication/register",
  FORGOT_PASSWORD = "authentication/forgotPassword",
  RESET_USER_PASSWORD = "authentication/resetUserPassword",
  CHANGE_USER_PASSWORD = "authentication/changeUserPassword",
  ME = "authentication/me",
}

const signIn = async (param: SignInRequest): Promise<SignInResponse> => {
  try {
    const res = await authenticationApi.post<SignInResponse>(
      AuthRoute.LOGIN,
      param,
    );
    const data: SignInResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const register = async (params: RegisterRequest): Promise<RegisterResponse> => {
  try {
    const res = await authenticationApi.post<RegisterResponse>(
      AuthRoute.REGISTER,
      params,
    );
    const data: RegisterResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const changeUserPassword = async (
  param: ChangeUserPasswordRequest,
): Promise<string> => {
  try {
    const res = await authenticationApi.post<string>(
      AuthRoute.CHANGE_USER_PASSWORD,
      param,
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

const forgotPassword = async (
  email: string,
): Promise<ForgotPasswordResponse> => {
  try {
    const res = await authenticationApi.post<ForgotPasswordResponse>(
      AuthRoute.FORGOT_PASSWORD,
      { email },
    );
    const data: ForgotPasswordResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const resetUserPassword = async (
  params: ResetUserPasswordRequest,
): Promise<ResetUserPasswordResponse> => {
  try {
    const res = await authenticationApi.post<ResetUserPasswordResponse>(
      AuthRoute.RESET_USER_PASSWORD,
      params,
    );
    const data: ResetUserPasswordResponse = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const me = async (): Promise<Me> => {
  try {
    const res = await authenticationApi.get<Me>(AuthRoute.ME, {
      headers: {
        Authorization: `Bearer ${Cookies.get("token")}`,
      },
    });
    const data: Me = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

export const authService = {
  register,
  me,
  signIn,
  forgotPassword,
  resetUserPassword,
  changeUserPassword,
};
