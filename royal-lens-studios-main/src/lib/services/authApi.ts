import { api, isUnauthorizedError } from "@/lib/api";
import type { AuthResponse, LoginPayload, RegisterPayload } from "@/lib/services/types";

export const authApi = {
  async register(payload: RegisterPayload) {
    const { data } = await api.post<AuthResponse>("/api/auth/register", payload);
    return data;
  },

  async login(payload: LoginPayload) {
    const { data } = await api.post<AuthResponse>("/api/auth/login", payload);
    return data;
  },

  async me() {
    try {
      const { data } = await api.get<AuthResponse>("/api/auth/me");
      return data.user;
    } catch (error) {
      if (isUnauthorizedError(error)) return null;
      throw error;
    }
  },

  async logout() {
    await api.post("/api/auth/logout");
  },
};