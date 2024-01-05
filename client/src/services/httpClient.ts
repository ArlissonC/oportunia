import axios, { AxiosResponse } from "axios";
import Cookies from "js-cookie";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const http = axios.create({
  baseURL,
});

http.interceptors.request.use((config) => {
  const token = Cookies.get("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const get = <T>(
  url: string,
  params?: object,
  headers?: object,
): Promise<AxiosResponse<T>> => http.get(url, { params, headers });

const post = <T>(url: string, data?: object): Promise<AxiosResponse<T>> =>
  http.post(url, data);

const put = <T>(url: string, data?: object): Promise<AxiosResponse<T>> =>
  http.put(url, data);

const del = <T>(url: string): Promise<AxiosResponse<T>> => http.delete(url);

export const httpClient = {
  get,
  post,
  put,
  del,
};
