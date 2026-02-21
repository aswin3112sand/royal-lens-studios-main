import { api } from "@/lib/api";
import type {
  Booking,
  Client,
  CreateClientPayload,
  CreateLeadPayload,
  CreatePackagePayload,
  CreateProjectPayload,
  DashboardResponse,
  Lead,
  PackageItem,
  Project,
  StudioSettings,
  UpdateStudioSettingsPayload,
} from "@/lib/services/types";

export const adminApi = {
  async getDashboard() {
    const { data } = await api.get<DashboardResponse>("/api/admin/dashboard");
    return data;
  },

  async getBookings() {
    const { data } = await api.get<Booking[]>("/api/admin/bookings");
    return data;
  },

  async updateBookingStatus(id: number, status: string) {
    const { data } = await api.patch<Booking>(`/api/admin/bookings/${id}/status`, { status });
    return data;
  },

  async getLeads() {
    const { data } = await api.get<Lead[]>("/api/admin/leads");
    return data;
  },

  async createLead(payload: CreateLeadPayload) {
    const { data } = await api.post<Lead>("/api/admin/leads", payload);
    return data;
  },

  async updateLeadStatus(id: number, status: string) {
    const { data } = await api.patch<Lead>(`/api/admin/leads/${id}/status`, { status });
    return data;
  },

  async getClients() {
    const { data } = await api.get<Client[]>("/api/admin/clients");
    return data;
  },

  async createClient(payload: CreateClientPayload) {
    const { data } = await api.post<Client>("/api/admin/clients", payload);
    return data;
  },

  async getProjects() {
    const { data } = await api.get<Project[]>("/api/admin/projects");
    return data;
  },

  async createProject(payload: CreateProjectPayload) {
    const { data } = await api.post<Project>("/api/admin/projects", payload);
    return data;
  },

  async deleteProject(id: number) {
    await api.delete(`/api/admin/projects/${id}`);
  },

  async getPackages() {
    const { data } = await api.get<PackageItem[]>("/api/admin/packages");
    return data;
  },

  async createPackage(payload: CreatePackagePayload) {
    const { data } = await api.post<PackageItem>("/api/admin/packages", payload);
    return data;
  },

  async deletePackage(id: number) {
    await api.delete(`/api/admin/packages/${id}`);
  },

  async getSettings() {
    const { data } = await api.get<StudioSettings>("/api/admin/settings");
    return data;
  },

  async updateSettings(payload: UpdateStudioSettingsPayload) {
    const { data } = await api.put<StudioSettings>("/api/admin/settings", payload);
    return data;
  },
};