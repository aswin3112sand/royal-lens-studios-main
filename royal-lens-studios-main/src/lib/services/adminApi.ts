import { localStore } from "@/lib/services/localStore";
import type {
  CreateClientPayload,
  CreateLeadPayload,
  CreatePackagePayload,
  CreateProjectPayload,
  UpdateStudioSettingsPayload,
} from "@/lib/services/types";

export const adminApi = {
  async getDashboard() {
    return localStore.getDashboard();
  },

  async getBookings() {
    return localStore.getBookings();
  },

  async updateBookingStatus(id: number, status: string) {
    return localStore.updateBookingStatus(id, status);
  },

  async getLeads() {
    return localStore.getLeads();
  },

  async createLead(payload: CreateLeadPayload) {
    return localStore.createLead(payload);
  },

  async updateLeadStatus(id: number, status: string) {
    return localStore.updateLeadStatus(id, status);
  },

  async getClients() {
    return localStore.getClients();
  },

  async createClient(payload: CreateClientPayload) {
    return localStore.createClient(payload);
  },

  async getProjects() {
    return localStore.getProjects();
  },

  async createProject(payload: CreateProjectPayload) {
    return localStore.createProject(payload);
  },

  async deleteProject(id: number) {
    await localStore.deleteProject(id);
  },

  async getPackages() {
    return localStore.getPackages();
  },

  async createPackage(payload: CreatePackagePayload) {
    return localStore.createPackage(payload);
  },

  async deletePackage(id: number) {
    await localStore.deletePackage(id);
  },

  async getSettings() {
    return localStore.getSettings();
  },

  async updateSettings(payload: UpdateStudioSettingsPayload) {
    return localStore.updateSettings(payload);
  },
};
