const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.trim() || "";
const TOKEN_KEY = "auth_token";

type AuthUser = {
  id: number;
  email: string;
  fullName: string | null;
  role: "USER" | "STAFF" | "ADMIN";
};

type AuthResponse = {
  user: AuthUser;
  token: string | null;
};

export const loginWithFetch = async (email: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error(`Login failed with status ${response.status}`);
  }

  const data = (await response.json()) as AuthResponse;
  if (data.token) {
    localStorage.setItem(TOKEN_KEY, data.token);
  }
  return data.user;
};

export const fetchMeWithToken = async () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: "GET",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: "include",
  });

  if (response.status === 401) {
    localStorage.removeItem(TOKEN_KEY);
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to load current user: ${response.status}`);
  }

  const data = (await response.json()) as AuthResponse;
  return data.user;
};
