import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";
import About from "@/pages/About";
import Booking from "@/pages/Booking";
import Contact from "@/pages/Contact";
import Index from "@/pages/Index";
import Portfolio from "@/pages/Portfolio";
import Services from "@/pages/Services";
import Testimonials from "@/pages/Testimonials";

const mocks = vi.hoisted(() => ({
  toast: vi.fn(),
  getPackages: vi.fn(),
  createContactMessage: vi.fn(),
  getMyBookings: vi.fn(),
  createBooking: vi.fn(),
}));

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mocks.toast }),
}));

vi.mock("@/lib/services/publicApi", () => ({
  publicApi: {
    getPackages: mocks.getPackages,
    createContactMessage: mocks.createContactMessage,
  },
}));

vi.mock("@/lib/services/bookingApi", () => ({
  bookingApi: {
    getMyBookings: mocks.getMyBookings,
    createBooking: mocks.createBooking,
  },
}));

const renderWithRouter = (node: JSX.Element) =>
  render(<MemoryRouter>{node}</MemoryRouter>);

beforeEach(() => {
  mocks.toast.mockReset();
  mocks.getPackages.mockReset();
  mocks.createContactMessage.mockReset();
  mocks.getMyBookings.mockReset();
  mocks.createBooking.mockReset();
  mocks.getPackages.mockResolvedValue([]);
  mocks.getMyBookings.mockResolvedValue([]);
});

describe("Public pages smoke", () => {
  it("renders home page without crash", async () => {
    renderWithRouter(<Index />);
    expect(await screen.findByText(/premium visual funnel/i)).toBeInTheDocument();
    await waitFor(() => expect(mocks.getPackages).toHaveBeenCalled());
  });

  it("renders about page", () => {
    renderWithRouter(<About />);
    expect(screen.getByText("Our Royal Journey")).toBeInTheDocument();
  });

  it("renders services page", () => {
    renderWithRouter(<Services />);
    expect(screen.getByText("Our Services")).toBeInTheDocument();
  });

  it("renders portfolio page", () => {
    renderWithRouter(<Portfolio />);
    expect(screen.getByText("Portfolio")).toBeInTheDocument();
  });

  it("renders testimonials page", () => {
    renderWithRouter(<Testimonials />);
    expect(screen.getByText("Client Stories")).toBeInTheDocument();
  });

  it("renders contact page", () => {
    renderWithRouter(<Contact />);
    expect(screen.getByText("Contact")).toBeInTheDocument();
  });

  it("renders booking page", async () => {
    renderWithRouter(<Booking />);
    expect(screen.getByText(/book a session/i)).toBeInTheDocument();
    await waitFor(() => expect(mocks.getMyBookings).toHaveBeenCalled());
  });
});
