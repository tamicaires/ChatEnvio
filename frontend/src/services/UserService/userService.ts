import { Api } from "../Api/ApiConfig";
import { getTokenLocalStorage } from "../../context/AuthProvider/util";
import { AxiosRequestConfig } from "axios";
import { UserCreate } from "../../interface/user-interface";

const token = getTokenLocalStorage();

const handleRequest = async (config: AxiosRequestConfig) => {
  try {
    const response = await Api().request(config);

    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const userService = {
  createUser: async (userData: UserCreate) => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/create",
      data: userData,
      headers: { 'Authorization': `Bearer ${token}` },
    };

    return handleRequest(config);
  },
};
