import { api } from "@/lib/api";
import type {
  ContactMessagePayload,
  PackageItem,
  Testimonial,
} from "@/lib/services/types";

export const publicApi = {
  async getPackages(limit?: number) {
    const { data } = await api.get<PackageItem[]>("/api/public/packages", {
      params: limit ? { limit } : undefined,
    });
    return data;
  },

  async getTestimonials(limit?: number) {
    const { data } = await api.get<Testimonial[]>("/api/public/testimonials", {
      params: limit ? { limit } : undefined,
    });
    return data;
  },

  async createContactMessage(payload: ContactMessagePayload) {
    await api.post("/api/contact-messages", payload);
  },
};