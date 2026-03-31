import { localStore } from "@/lib/services/localStore";
import type {
  ContactMessagePayload,
} from "@/lib/services/types";

export const publicApi = {
  async getPackages(limit?: number) {
    return localStore.getPublicPackages(limit);
  },

  async getTestimonials(limit?: number) {
    return localStore.getPublicTestimonials(limit);
  },

  async createContactMessage(payload: ContactMessagePayload) {
    await localStore.createContactMessage(payload);
  },
};
