import { AxiosError } from "axios";
import { httpClient } from "../httpClient";
import { Address } from "./types";

enum AddressRoute {
  UPDATE_ADDRESS = "api/address/updateAddress",
  GET_ADDRESS_BY_USER = "api/address/getAddressByUser",
}

const getAddressByUser = async (): Promise<Address> => {
  try {
    const res = await httpClient.get<Address>(AddressRoute.GET_ADDRESS_BY_USER);
    const data: Address = res.data;
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data.message);
    }

    throw error;
  }
};

const updateAddress = async (params: Address): Promise<string> => {
  try {
    const res = await httpClient.put<string>(
      AddressRoute.UPDATE_ADDRESS,
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

export const addressService = {
  getAddressByUser,
  updateAddress,
};
