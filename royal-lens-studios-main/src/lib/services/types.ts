export type UserRole = "USER" | "STAFF" | "ADMIN";

export interface AuthUser {
  id: number;
  email: string;
  fullName: string | null;
  role: UserRole;
}

export interface AuthResponse {
  user: AuthUser;
}

export interface RegisterPayload {
  email: string;
  password: string;
  fullName?: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface Booking {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  shootType: string;
  preferredDate: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBookingPayload {
  name: string;
  email: string;
  phone?: string;
  shootType: string;
  preferredDate: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  notes: string | null;
  nextFollowup: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLeadPayload {
  name: string;
  email?: string;
  phone?: string;
  source?: string;
  notes?: string;
}

export interface Client {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  notes: string | null;
  tags: string[];
  totalBookings: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateClientPayload {
  name: string;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  category: string;
  description: string | null;
  story: string | null;
  location: string | null;
  published: boolean;
  featured: boolean;
  shootDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectPayload {
  title: string;
  slug?: string;
  category: string;
  description?: string;
  story?: string;
  location?: string;
}

export interface PackageItem {
  id: number;
  name: string;
  tier: string;
  price: number;
  description: string | null;
  deliverables: string[];
  isPopular: boolean;
  active: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePackagePayload {
  name: string;
  tier: string;
  price: number;
  description?: string;
  isPopular?: boolean;
}

export interface Testimonial {
  id: number;
  clientName: string;
  clientRole: string | null;
  review: string;
  rating: number;
  published: boolean;
  featured: boolean;
  createdAt: string;
}

export interface StudioSettings {
  id: number;
  studioName: string | null;
  whatsappNumber: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  updatedAt: string;
}

export interface UpdateStudioSettingsPayload {
  studioName?: string | null;
  whatsappNumber?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

export interface DashboardStats {
  bookings: number;
  leads: number;
  clients: number;
  todayBookings: number;
}

export interface DashboardResponse {
  stats: DashboardStats;
  recentBookings: Booking[];
  recentLeads: Lead[];
}

export interface ContactMessagePayload {
  name: string;
  email: string;
  message: string;
}