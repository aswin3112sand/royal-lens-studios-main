import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL?.trim() || "";
const AUTH_TOKEN_KEY = "auth_token";

export const api = axios.create({
  baseURL,
  withCredentials: true,
  timeout: 15000,
});

export const getStoredAuthToken = () => localStorage.getItem(AUTH_TOKEN_KEY);

export const setStoredAuthToken = (token: string | null) => {
  if (token && token.trim().length > 0) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    return;
  }
  localStorage.removeItem(AUTH_TOKEN_KEY);
};

api.interceptors.request.use((config) => {
  const token = getStoredAuthToken();
  if (!token) return config;

  if (config.headers && typeof (config.headers as { set?: unknown }).set === "function") {
    (config.headers as { set: (name: string, value: string) => void }).set("Authorization", `Bearer ${token}`);
    return config;
  }

  config.headers = {
    ...(config.headers ?? {}),
    Authorization: `Bearer ${token}`,
  };
  return config;
});

export const extractApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const message = (error.response?.data as { message?: string } | undefined)?.message;
    if (message) return message;
  }
  return fallback;
};

export const isUnauthorizedError = (error: unknown) =>
  axios.isAxiosError(error) && error.response?.status === 401;
