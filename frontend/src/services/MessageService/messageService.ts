import { Api } from "../Api/ApiConfig";
import { getTokenLocalStorage } from "../../context/AuthProvider/util";
import { AxiosRequestConfig } from "axios";
import { CreateChatMessage } from "../../interface/chat-message.interface";

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

export const messageService = {
  sendMessage: async (chatData: CreateChatMessage) => {
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "/message",
      data: chatData,
      headers: { 'Authorization': `Bearer ${token}` },
    };
    console.log('service', chatData)
    return handleRequest(config);
  },
  getAllMessages: async () => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: "/message",
      headers: { 'Authorization': `Bearer ${token}` },
    };

    return handleRequest(config)
  },
  getChatMessages: async (groupId: string) => {
    const config: AxiosRequestConfig = {
      method: "GET",
      url: `/message/${groupId}`,
      headers: { 'Authorization': `Bearer ${token}` },
    };

    return handleRequest(config)
  }
};
