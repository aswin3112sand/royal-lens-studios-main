import { AppError, getStoredAuthToken, setStoredAuthToken } from "@/lib/api";
import type {
  AuthResponse,
  AuthUser,
  Booking,
  Client,
  ContactMessagePayload,
  CreateBookingPayload,
  CreateClientPayload,
  CreateLeadPayload,
  CreatePackagePayload,
  CreateProjectPayload,
  DashboardResponse,
  Lead,
  LoginPayload,
  PackageItem,
  Project,
  RegisterPayload,
  StudioSettings,
  Testimonial,
  UpdateStudioSettingsPayload,
} from "@/lib/services/types";

interface InternalUser extends AuthUser {
  password: string;
}

interface StoredContactMessage extends ContactMessagePayload {
  id: number;
  createdAt: string;
}

interface StoredBooking extends Booking {
  userId: number;
}

const STORAGE_KEYS = {
  users: "rls_users",
  bookings: "rls_bookings",
  leads: "rls_leads",
  clients: "rls_clients",
  projects: "rls_projects",
  packages: "rls_packages",
  testimonials: "rls_testimonials",
  settings: "rls_settings",
  contactMessages: "rls_contact_messages",
} as const;

const TOKEN_PREFIX = "local-auth-";

const delay = (ms = 120) => new Promise((resolve) => window.setTimeout(resolve, ms));

const isoDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const defaultUsers: InternalUser[] = [
  {
    id: 1,
    email: "admin@royallens.studio",
    fullName: "Royal Lens Admin",
    role: "ADMIN",
    password: "admin123",
  },
  {
    id: 2,
    email: "staff@royallens.studio",
    fullName: "Studio Staff",
    role: "STAFF",
    password: "staff123",
  },
  {
    id: 3,
    email: "client@example.com",
    fullName: "Sample Client",
    role: "USER",
    password: "client123",
  },
];

const defaultBookings: StoredBooking[] = [
  {
    id: 1,
    userId: 3,
    name: "Sample Client",
    email: "client@example.com",
    phone: "+91 98765 43210",
    shootType: "Wedding Photography",
    preferredDate: new Date(new Date().setDate(new Date().getDate() + 14)).toISOString().slice(0, 10),
    status: "pending",
    createdAt: isoDaysAgo(1),
    updatedAt: isoDaysAgo(1),
  },
];

const defaultLeads: Lead[] = [
  {
    id: 1,
    name: "Ananya Rao",
    email: "ananya@example.com",
    phone: "+91 98765 11111",
    source: "website",
    status: "new",
    notes: "Interested in wedding photography for December.",
    nextFollowup: null,
    createdAt: isoDaysAgo(2),
    updatedAt: isoDaysAgo(2),
  },
];

const defaultClients: Client[] = [
  {
    id: 1,
    name: "Sample Client",
    email: "client@example.com",
    phone: "+91 98765 43210",
    notes: "Repeat portrait client.",
    tags: ["portrait", "repeat"],
    totalBookings: 1,
    createdAt: isoDaysAgo(8),
    updatedAt: isoDaysAgo(1),
  },
];

const defaultProjects: Project[] = [
  {
    id: 1,
    title: "Grand Wedding Story",
    slug: "grand-wedding-story",
    category: "wedding",
    description: "Luxury wedding story captured in cinematic style.",
    story: "Full-day wedding photography across ceremony and reception.",
    location: "Chennai",
    published: true,
    featured: true,
    shootDate: isoDaysAgo(30).slice(0, 10),
    createdAt: isoDaysAgo(30),
    updatedAt: isoDaysAgo(30),
  },
];

const defaultPackages: PackageItem[] = [
  {
    id: 1,
    name: "Starter Launch",
    tier: "starter",
    price: 19999,
    description: "For early-stage creators who need high-conversion visual assets.",
    deliverables: ["Creative direction", "2-hour shoot", "25 retouched assets", "7-day delivery"],
    isPopular: false,
    active: true,
    sortOrder: 1,
    createdAt: isoDaysAgo(10),
    updatedAt: isoDaysAgo(10),
  },
  {
    id: 2,
    name: "Growth Scale",
    tier: "growth",
    price: 39999,
    description: "Built for teams running paid ads and weekly content cycles.",
    deliverables: ["Brand strategy call", "Full-day shoot", "80 retouched assets", "3-day priority delivery"],
    isPopular: true,
    active: true,
    sortOrder: 2,
    createdAt: isoDaysAgo(9),
    updatedAt: isoDaysAgo(9),
  },
  {
    id: 3,
    name: "Elite Authority",
    tier: "premium",
    price: 0,
    description: "Cinematic campaigns for premium positioning and large launches.",
    deliverables: ["Campaign planning", "Multi-location shoot", "Dedicated creative lead", "Rapid iteration support"],
    isPopular: false,
    active: true,
    sortOrder: 3,
    createdAt: isoDaysAgo(8),
    updatedAt: isoDaysAgo(8),
  },
];

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    clientName: "Victoria Ashford",
    clientRole: "Bride",
    review: "Royal Lens captured our wedding in the most magical way. Every photo feels like a scene from a fairy tale.",
    rating: 5,
    published: true,
    featured: true,
    createdAt: isoDaysAgo(5),
  },
  {
    id: 2,
    clientName: "James Whitmore",
    clientRole: "CEO, Sterling Corp",
    review: "The corporate portraits exceeded our expectations. Professional, elegant, and perfectly on-brand.",
    rating: 5,
    published: true,
    featured: false,
    createdAt: isoDaysAgo(4),
  },
];

const defaultSettings: StudioSettings = {
  id: 1,
  studioName: "Royal Lens Studios",
  whatsappNumber: "919876543210",
  phone: "+44 20 7946 0958",
  email: "hello@royallens.studio",
  address: "123 Royal Avenue, London",
  updatedAt: isoDaysAgo(0),
};

const defaultContactMessages: StoredContactMessage[] = [];

const readStorage = <T,>(key: string, fallback: T): T => {
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    return fallback;
  }

  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
};

const writeStorage = <T,>(key: string, value: T) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

const ensureSeedData = () => {
  if (typeof window === "undefined") {
    return;
  }

  if (!window.localStorage.getItem(STORAGE_KEYS.users)) {
    writeStorage(STORAGE_KEYS.users, defaultUsers);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.bookings)) {
    writeStorage(STORAGE_KEYS.bookings, defaultBookings);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.leads)) {
    writeStorage(STORAGE_KEYS.leads, defaultLeads);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.clients)) {
    writeStorage(STORAGE_KEYS.clients, defaultClients);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.projects)) {
    writeStorage(STORAGE_KEYS.projects, defaultProjects);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.packages)) {
    writeStorage(STORAGE_KEYS.packages, defaultPackages);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.testimonials)) {
    writeStorage(STORAGE_KEYS.testimonials, defaultTestimonials);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.settings)) {
    writeStorage(STORAGE_KEYS.settings, defaultSettings);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.contactMessages)) {
    writeStorage(STORAGE_KEYS.contactMessages, defaultContactMessages);
  }
};

const getUsers = () => {
  ensureSeedData();
  return readStorage<InternalUser[]>(STORAGE_KEYS.users, clone(defaultUsers));
};

const saveUsers = (users: InternalUser[]) => writeStorage(STORAGE_KEYS.users, users);
const getBookings = () => readStorage<StoredBooking[]>(STORAGE_KEYS.bookings, clone(defaultBookings));
const saveBookings = (bookings: StoredBooking[]) => writeStorage(STORAGE_KEYS.bookings, bookings);
const getLeads = () => readStorage<Lead[]>(STORAGE_KEYS.leads, clone(defaultLeads));
const saveLeads = (leads: Lead[]) => writeStorage(STORAGE_KEYS.leads, leads);
const getClients = () => readStorage<Client[]>(STORAGE_KEYS.clients, clone(defaultClients));
const saveClients = (clients: Client[]) => writeStorage(STORAGE_KEYS.clients, clients);
const getProjects = () => readStorage<Project[]>(STORAGE_KEYS.projects, clone(defaultProjects));
const saveProjects = (projects: Project[]) => writeStorage(STORAGE_KEYS.projects, projects);
const getPackages = () => readStorage<PackageItem[]>(STORAGE_KEYS.packages, clone(defaultPackages));
const savePackages = (packages: PackageItem[]) => writeStorage(STORAGE_KEYS.packages, packages);
const getTestimonials = () => readStorage<Testimonial[]>(STORAGE_KEYS.testimonials, clone(defaultTestimonials));
const getSettings = () => readStorage<StudioSettings>(STORAGE_KEYS.settings, clone(defaultSettings));
const saveSettings = (settings: StudioSettings) => writeStorage(STORAGE_KEYS.settings, settings);
const getContactMessages = () => readStorage<StoredContactMessage[]>(STORAGE_KEYS.contactMessages, clone(defaultContactMessages));
const saveContactMessages = (messages: StoredContactMessage[]) => writeStorage(STORAGE_KEYS.contactMessages, messages);

const nextId = (items: Array<{ id: number }>) =>
  items.reduce((max, item) => Math.max(max, item.id), 0) + 1;

const nowIso = () => new Date().toISOString();

const createToken = (userId: number) => `${TOKEN_PREFIX}${userId}`;

const findUserByToken = () => {
  const token = getStoredAuthToken();
  if (!token || !token.startsWith(TOKEN_PREFIX)) {
    return null;
  }

  const userId = Number(token.slice(TOKEN_PREFIX.length));
  if (Number.isNaN(userId)) {
    return null;
  }

  return getUsers().find((user) => user.id === userId) ?? null;
};

const requireAuthenticatedUser = () => {
  const user = findUserByToken();
  if (!user) {
    throw new AppError("Please sign in to continue.");
  }
  return user;
};

const requireAdminOrStaffUser = () => {
  const user = requireAuthenticatedUser();
  if (user.role !== "ADMIN" && user.role !== "STAFF") {
    throw new AppError("Admin or staff access is required.");
  }
  return user;
};

const toAuthResponse = (user: InternalUser): AuthResponse => ({
  user: {
    id: user.id,
    email: user.email,
    fullName: user.fullName,
    role: user.role,
  },
  token: createToken(user.id),
});

const generateSlug = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const sortByNewest = <T extends { createdAt: string }>(items: T[]) =>
  [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

const upsertLeadFromContact = (payload: ContactMessagePayload) => {
  const leads = getLeads();
  const existing = leads.find((lead) => lead.email?.toLowerCase() === payload.email.toLowerCase());
  const updatedAt = nowIso();

  if (existing) {
    existing.name = payload.name;
    existing.notes = payload.message;
    existing.updatedAt = updatedAt;
    saveLeads(leads);
    return;
  }

  leads.unshift({
    id: nextId(leads),
    name: payload.name,
    email: payload.email,
    phone: null,
    source: "contact_form",
    status: "new",
    notes: payload.message,
    nextFollowup: null,
    createdAt: updatedAt,
    updatedAt,
  });
  saveLeads(leads);
};

const upsertLeadFromBooking = (booking: StoredBooking) => {
  const leads = getLeads();
  const existing = leads.find((lead) => lead.email?.toLowerCase() === booking.email.toLowerCase());
  const updatedAt = nowIso();

  if (existing) {
    existing.name = booking.name;
    existing.phone = booking.phone;
    existing.notes = `Booking interest for ${booking.shootType}`;
    existing.updatedAt = updatedAt;
    saveLeads(leads);
    return;
  }

  leads.unshift({
    id: nextId(leads),
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    source: "booking",
    status: "new",
    notes: `Booking interest for ${booking.shootType}`,
    nextFollowup: null,
    createdAt: updatedAt,
    updatedAt,
  });
  saveLeads(leads);
};

const upsertClientFromBooking = (booking: StoredBooking) => {
  const clients = getClients();
  const updatedAt = nowIso();
  const existing = clients.find((client) => client.email?.toLowerCase() === booking.email.toLowerCase());

  if (existing) {
    existing.name = booking.name;
    existing.phone = booking.phone;
    existing.totalBookings += 1;
    existing.updatedAt = updatedAt;
    saveClients(clients);
    return;
  }

  clients.unshift({
    id: nextId(clients),
    name: booking.name,
    email: booking.email,
    phone: booking.phone,
    notes: `Created from booking for ${booking.shootType}`,
    tags: [booking.shootType.toLowerCase()],
    totalBookings: 1,
    createdAt: updatedAt,
    updatedAt,
  });
  saveClients(clients);
};

export const localStore = {
  async register(payload: RegisterPayload) {
    await delay();
    const users = getUsers();
    const email = payload.email.trim().toLowerCase();
    if (users.some((user) => user.email.toLowerCase() === email)) {
      throw new AppError("An account with this email already exists.");
    }

    const user: InternalUser = {
      id: nextId(users),
      email,
      fullName: payload.fullName?.trim() || null,
      role: "USER",
      password: payload.password,
    };

    users.push(user);
    saveUsers(users);
    const response = toAuthResponse(user);
    setStoredAuthToken(response.token);
    return response;
  },

  async login(payload: LoginPayload) {
    await delay();
    const email = payload.email.trim().toLowerCase();
    const user = getUsers().find((candidate) => candidate.email.toLowerCase() === email);
    if (!user || user.password !== payload.password) {
      throw new AppError("Invalid email or password.");
    }

    const response = toAuthResponse(user);
    setStoredAuthToken(response.token);
    return response;
  },

  async me() {
    await delay(40);
    const user = findUserByToken();
    if (!user) {
      setStoredAuthToken(null);
      return null;
    }

    return {
      id: user.id,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
    } satisfies AuthUser;
  },

  async logout() {
    await delay(40);
    setStoredAuthToken(null);
  },

  async getPublicPackages(limit?: number) {
    await delay(60);
    const items = getPackages()
      .filter((item) => item.active)
      .sort((a, b) => a.sortOrder - b.sortOrder);
    return typeof limit === "number" ? items.slice(0, limit) : items;
  },

  async getPublicTestimonials(limit?: number) {
    await delay(60);
    const items = getTestimonials().filter((item) => item.published);
    return typeof limit === "number" ? items.slice(0, limit) : items;
  },

  async createContactMessage(payload: ContactMessagePayload) {
    await delay();
    const messages = getContactMessages();
    messages.unshift({
      id: nextId(messages),
      name: payload.name,
      email: payload.email,
      message: payload.message,
      createdAt: nowIso(),
    });
    saveContactMessages(messages);
    upsertLeadFromContact(payload);
  },

  async getMyBookings() {
    await delay(80);
    const user = requireAuthenticatedUser();
    return sortByNewest(getBookings().filter((booking) => booking.userId === user.id));
  },

  async createBooking(payload: CreateBookingPayload) {
    await delay();
    const user = requireAuthenticatedUser();
    const bookings = getBookings();
    const booking: StoredBooking = {
      id: nextId(bookings),
      userId: user.id,
      name: payload.name,
      email: payload.email,
      phone: payload.phone ?? null,
      shootType: payload.shootType,
      preferredDate: payload.preferredDate,
      status: "pending",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    bookings.unshift(booking);
    saveBookings(bookings);
    upsertLeadFromBooking(booking);
    upsertClientFromBooking(booking);
    return booking;
  },

  async getDashboard(): Promise<DashboardResponse> {
    await delay(100);
    requireAdminOrStaffUser();
    const bookings = sortByNewest(getBookings());
    const leads = sortByNewest(getLeads());
    const clients = getClients();
    const today = new Date().toISOString().slice(0, 10);

    return {
      stats: {
        bookings: bookings.length,
        leads: leads.length,
        clients: clients.length,
        todayBookings: bookings.filter((booking) => booking.preferredDate === today).length,
      },
      recentBookings: bookings.slice(0, 5),
      recentLeads: leads.slice(0, 5),
    };
  },

  async getBookings() {
    await delay(60);
    requireAdminOrStaffUser();
    return sortByNewest(getBookings());
  },

  async updateBookingStatus(id: number, status: string) {
    await delay();
    requireAdminOrStaffUser();
    const bookings = getBookings();
    const booking = bookings.find((item) => item.id === id);
    if (!booking) {
      throw new AppError("Booking not found.");
    }
    booking.status = status;
    booking.updatedAt = nowIso();
    saveBookings(bookings);
    return booking;
  },

  async getLeads() {
    await delay(60);
    requireAdminOrStaffUser();
    return sortByNewest(getLeads());
  },

  async createLead(payload: CreateLeadPayload) {
    await delay();
    requireAdminOrStaffUser();
    const leads = getLeads();
    const lead: Lead = {
      id: nextId(leads),
      name: payload.name,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      source: payload.source ?? "manual",
      status: "new",
      notes: payload.notes ?? null,
      nextFollowup: null,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    leads.unshift(lead);
    saveLeads(leads);
    return lead;
  },

  async updateLeadStatus(id: number, status: string) {
    await delay();
    requireAdminOrStaffUser();
    const leads = getLeads();
    const lead = leads.find((item) => item.id === id);
    if (!lead) {
      throw new AppError("Lead not found.");
    }
    lead.status = status;
    lead.updatedAt = nowIso();
    saveLeads(leads);
    return lead;
  },

  async getClients() {
    await delay(60);
    requireAdminOrStaffUser();
    return sortByNewest(getClients());
  },

  async createClient(payload: CreateClientPayload) {
    await delay();
    requireAdminOrStaffUser();
    const clients = getClients();
    const client: Client = {
      id: nextId(clients),
      name: payload.name,
      email: payload.email ?? null,
      phone: payload.phone ?? null,
      notes: payload.notes ?? null,
      tags: [],
      totalBookings: 0,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    clients.unshift(client);
    saveClients(clients);
    return client;
  },

  async getProjects() {
    await delay(60);
    requireAdminOrStaffUser();
    return sortByNewest(getProjects());
  },

  async createProject(payload: CreateProjectPayload) {
    await delay();
    requireAdminOrStaffUser();
    const projects = getProjects();
    const title = payload.title.trim();
    const project: Project = {
      id: nextId(projects),
      title,
      slug: payload.slug?.trim() ? generateSlug(payload.slug) : generateSlug(title),
      category: payload.category,
      description: payload.description ?? null,
      story: payload.story ?? null,
      location: payload.location ?? null,
      published: false,
      featured: false,
      shootDate: null,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    projects.unshift(project);
    saveProjects(projects);
    return project;
  },

  async deleteProject(id: number) {
    await delay();
    requireAdminOrStaffUser();
    const projects = getProjects();
    saveProjects(projects.filter((project) => project.id !== id));
  },

  async getPackages() {
    await delay(60);
    requireAdminOrStaffUser();
    return [...getPackages()].sort((a, b) => a.sortOrder - b.sortOrder);
  },

  async createPackage(payload: CreatePackagePayload) {
    await delay();
    requireAdminOrStaffUser();
    const packages = getPackages();
    const nextSortOrder = packages.reduce((max, item) => Math.max(max, item.sortOrder), 0) + 1;
    const item: PackageItem = {
      id: nextId(packages),
      name: payload.name,
      tier: payload.tier,
      price: payload.price,
      description: payload.description ?? null,
      deliverables: [],
      isPopular: Boolean(payload.isPopular),
      active: true,
      sortOrder: nextSortOrder,
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };
    packages.push(item);
    savePackages(packages);
    return item;
  },

  async deletePackage(id: number) {
    await delay();
    requireAdminOrStaffUser();
    const packages = getPackages();
    savePackages(packages.filter((item) => item.id !== id));
  },

  async getSettings() {
    await delay(50);
    requireAdminOrStaffUser();
    return getSettings();
  },

  async updateSettings(payload: UpdateStudioSettingsPayload) {
    await delay();
    requireAdminOrStaffUser();
    const settings = {
      ...getSettings(),
      ...payload,
      updatedAt: nowIso(),
    };
    saveSettings(settings);
    return settings;
  },
};
