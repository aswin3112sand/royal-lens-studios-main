import { api, isUnauthorizedError, setStoredAuthToken } from "@/lib/api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/lib/services/types";

export const authApi = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
    setStoredAuthToken(data.token);
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
    setStoredAuthToken(data.token);
    return data;
  },

  async me() {
    try {
      const { data } = await api.get<AuthResponse>("/api/auth/me");
      return data.user;
    } catch (error) {
      if (isUnauthorizedError(error)) {
        setStoredAuthToken(null);
        return null;
      }
      throw error;
    }
  },

  async logout() {
    try {
      await api.post("/api/auth/logout");
    } finally {
      setStoredAuthToken(null);
    }
  },
};
