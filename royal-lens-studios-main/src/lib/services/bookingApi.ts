import { localStore } from "@/lib/services/localStore";
import type { CreateBookingPayload } from "@/lib/services/types";

export const bookingApi = {
  async getMyBookings() {
    return localStore.getMyBookings();
  },

  async createBooking(payload: CreateBookingPayload) {
    return localStore.createBooking(payload);
  },
};
