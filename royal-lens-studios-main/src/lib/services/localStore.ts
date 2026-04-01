import { AppError } from "@/lib/api";
import type {
  Booking,
  Client,
  ContactMessagePayload,
  CreateBookingPayload,
  Lead,
  PackageItem,
  Testimonial,
} from "@/lib/services/types";

interface StoredContactMessage extends ContactMessagePayload {
  id: number;
  createdAt: string;
}

const STORAGE_KEYS = {
  bookings: "rls_bookings",
  bookingHistory: "rls_booking_history",
  leads: "rls_leads",
  clients: "rls_clients",
  packages: "rls_packages",
  testimonials: "rls_testimonials",
  contactMessages: "rls_contact_messages",
} as const;

const delay = (ms = 120) => new Promise((resolve) => window.setTimeout(resolve, ms));

const isoDaysAgo = (days: number) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

const defaultBookings: Booking[] = [
  {
    id: 1,
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

const defaultContactMessages: StoredContactMessage[] = [];
const defaultBookingHistory: number[] = [];

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

  if (!window.localStorage.getItem(STORAGE_KEYS.bookings)) {
    writeStorage(STORAGE_KEYS.bookings, defaultBookings);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.bookingHistory)) {
    writeStorage(STORAGE_KEYS.bookingHistory, defaultBookingHistory);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.leads)) {
    writeStorage(STORAGE_KEYS.leads, defaultLeads);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.clients)) {
    writeStorage(STORAGE_KEYS.clients, defaultClients);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.packages)) {
    writeStorage(STORAGE_KEYS.packages, defaultPackages);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.testimonials)) {
    writeStorage(STORAGE_KEYS.testimonials, defaultTestimonials);
  }
  if (!window.localStorage.getItem(STORAGE_KEYS.contactMessages)) {
    writeStorage(STORAGE_KEYS.contactMessages, defaultContactMessages);
  }
};

const getBookings = () => {
  ensureSeedData();
  return readStorage<Booking[]>(STORAGE_KEYS.bookings, clone(defaultBookings));
};

const saveBookings = (bookings: Booking[]) => writeStorage(STORAGE_KEYS.bookings, bookings);
const getBookingHistory = () => readStorage<number[]>(STORAGE_KEYS.bookingHistory, clone(defaultBookingHistory));
const saveBookingHistory = (history: number[]) => writeStorage(STORAGE_KEYS.bookingHistory, history);
const getLeads = () => readStorage<Lead[]>(STORAGE_KEYS.leads, clone(defaultLeads));
const saveLeads = (leads: Lead[]) => writeStorage(STORAGE_KEYS.leads, leads);
const getClients = () => readStorage<Client[]>(STORAGE_KEYS.clients, clone(defaultClients));
const saveClients = (clients: Client[]) => writeStorage(STORAGE_KEYS.clients, clients);
const getPackages = () => readStorage<PackageItem[]>(STORAGE_KEYS.packages, clone(defaultPackages));
const getTestimonials = () => readStorage<Testimonial[]>(STORAGE_KEYS.testimonials, clone(defaultTestimonials));
const getContactMessages = () => readStorage<StoredContactMessage[]>(STORAGE_KEYS.contactMessages, clone(defaultContactMessages));
const saveContactMessages = (messages: StoredContactMessage[]) => writeStorage(STORAGE_KEYS.contactMessages, messages);

const nextId = (items: Array<{ id: number }>) => items.reduce((max, item) => Math.max(max, item.id), 0) + 1;
const nowIso = () => new Date().toISOString();

const sortByNewest = <T extends { createdAt: string }>(items: T[]) => [...items].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

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

const upsertLeadFromBooking = (booking: Booking) => {
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

const upsertClientFromBooking = (booking: Booking) => {
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
    const history = getBookingHistory();
    if (history.length === 0) {
      return [];
    }

    const visibleIds = new Set(history);
    return sortByNewest(getBookings().filter((booking) => visibleIds.has(booking.id)));
  },

  async createBooking(payload: CreateBookingPayload) {
    await delay();

    if (!payload.name.trim() || !payload.email.trim()) {
      throw new AppError("Name and email are required.");
    }

    const bookings = getBookings();
    const booking: Booking = {
      id: nextId(bookings),
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone?.trim() || null,
      shootType: payload.shootType,
      preferredDate: payload.preferredDate,
      status: "pending",
      createdAt: nowIso(),
      updatedAt: nowIso(),
    };

    bookings.unshift(booking);
    saveBookings(bookings);
    saveBookingHistory([booking.id, ...getBookingHistory().filter((id) => id !== booking.id)].slice(0, 8));
    upsertLeadFromBooking(booking);
    upsertClientFromBooking(booking);
    return booking;
  },
};
