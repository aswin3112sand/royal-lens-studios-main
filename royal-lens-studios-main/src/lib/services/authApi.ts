import { setStoredAuthToken } from "@/lib/api";
import { localStore } from "@/lib/services/localStore";
import type { LoginPayload, RegisterPayload } from "@/lib/services/types";

export const authApi = {
  async register(payload: RegisterPayload) {
    const response = await localStore.register(payload);
    setStoredAuthToken(response.token);
    return response;
  },

  async login(payload: LoginPayload) {
    const response = await localStore.login(payload);
    setStoredAuthToken(response.token);
    return response;
  },

  async me() {
    return localStore.me();
  },

  async logout() {
    await localStore.logout();
    setStoredAuthToken(null);
  },
};
