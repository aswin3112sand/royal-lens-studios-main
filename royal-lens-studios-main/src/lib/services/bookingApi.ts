import { api } from "@/lib/api";
import type { Booking, CreateBookingPayload } from "@/lib/services/types";

export const bookingApi = {
  async getMyBookings() {
    const { data } = await api.get<Booking[]>("/api/bookings/me");
    return data;
  },

  async createBooking(payload: CreateBookingPayload) {
    const { data } = await api.post<Booking>("/api/bookings", payload);
    return data;
  },
};