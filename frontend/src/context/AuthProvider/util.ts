import { Api } from "../../services/Api/ApiConfig";
import { IUser } from "./types";

export function setUserLocalStorage(user: IUser | null) {
  localStorage.setItem('user', JSON.stringify(user));
}

export function getUserLocalStorage() {
  const json = localStorage.getItem('user');

  if (!json) return null;

  const user = JSON.parse(json);

  return user ?? null;
}

export function getTokenLocalStorage() {
  const user = getUserLocalStorage();
  const token = user.token;

  return token;
}

export async function LoginRequest(email: string, password: string) {
  try {
    const request = await Api().post('login', { email, password });
    console.log('resquest', request)
    return request.data;
  } catch (error) {
    return null;
  }
}
