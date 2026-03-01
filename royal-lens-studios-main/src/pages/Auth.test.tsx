import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { vi } from "vitest";
import Auth from "@/pages/Auth";

const mocks = vi.hoisted(() => ({
  navigate: vi.fn(),
  toast: vi.fn(),
  me: vi.fn(),
  login: vi.fn(),
  register: vi.fn(),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mocks.navigate,
  };
});

vi.mock("@/hooks/use-toast", () => ({
  useToast: () => ({ toast: mocks.toast }),
}));

vi.mock("@/lib/services/authApi", () => ({
  authApi: {
    me: mocks.me,
    login: mocks.login,
    register: mocks.register,
  },
}));

const renderAuth = (route = "/auth") =>
  render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/contact" element={<div>Contact</div>} />
      </Routes>
    </MemoryRouter>,
  );

beforeEach(() => {
  mocks.navigate.mockReset();
  mocks.toast.mockReset();
  mocks.me.mockReset();
  mocks.login.mockReset();
  mocks.register.mockReset();

  mocks.me.mockResolvedValue(null);
  mocks.login.mockResolvedValue({ token: "token" });
  mocks.register.mockResolvedValue({ token: "token" });
});

describe("Auth page", () => {
  it("shows mobile-safe shell and full-width primary action", () => {
    renderAuth();

    expect(screen.getByTestId("auth-shell")).toHaveClass("w-full");
    expect(screen.getByRole("button", { name: "Sign In" })).toHaveClass("w-full");
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();
  });

  it("blocks login submit with invalid email", async () => {
    renderAuth();

    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "invalid" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Enter a valid email address.")).toBeInTheDocument();
    expect(mocks.login).not.toHaveBeenCalled();
  });

  it("validates signup password confirmation", async () => {
    renderAuth("/auth?tab=signup");

    fireEvent.change(screen.getByLabelText("Full Name"), { target: { value: "Alex" } });
    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "alex@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret123" } });
    fireEvent.change(screen.getByLabelText("Confirm Password"), { target: { value: "secret456" } });

    fireEvent.click(screen.getByRole("button", { name: "Create Account" }));

    expect(await screen.findByText("Passwords do not match.")).toBeInTheDocument();
    expect(mocks.register).not.toHaveBeenCalled();
  });

  it("submits login and redirects to booking", async () => {
    const dispatchSpy = vi.spyOn(window, "dispatchEvent");
    renderAuth();

    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    await waitFor(() => {
      expect(mocks.login).toHaveBeenCalledWith({ email: "user@example.com", password: "secret123" });
    });
    expect(mocks.navigate).toHaveBeenCalledWith("/booking");
    expect(dispatchSpy).toHaveBeenCalled();

    dispatchSpy.mockRestore();
  });

  it("shows inline API fallback message on login failure", async () => {
    mocks.login.mockRejectedValueOnce(new Error("failed"));
    renderAuth();

    fireEvent.change(screen.getByLabelText("Email Address"), { target: { value: "user@example.com" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "secret123" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }));

    expect(await screen.findByText("Please check your details and try again.")).toBeInTheDocument();
    expect(mocks.toast).toHaveBeenCalled();
  });

  it("redirects immediately when session already exists", async () => {
    mocks.me.mockResolvedValueOnce({
      id: 1,
      email: "existing@example.com",
      fullName: "Existing User",
      role: "USER",
    });

    renderAuth();

    await waitFor(() => {
      expect(mocks.navigate).toHaveBeenCalledWith("/booking");
    });
  });
});
