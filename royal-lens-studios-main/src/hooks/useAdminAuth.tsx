import { useState, useEffect, createContext, useContext, useCallback } from "react";
import type { AuthUser } from "@/lib/services/types";
import { getStoredAuthToken } from "@/lib/api";

interface AdminAuthContext {
  user: AuthUser | null;
  isAdmin: boolean;
  isStaff: boolean;
  isAdminOrStaff: boolean;
  loading: boolean;
  refreshAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

const AdminAuthCtx = createContext<AdminAuthContext>({
  user: null,
  isAdmin: false,
  isStaff: false,
  isAdminOrStaff: false,
  loading: true,
  refreshAuth: async () => {},
  logout: async () => {},
});

export const useAdminAuth = () => useContext(AdminAuthCtx);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const hasTokenOnBoot = Boolean(getStoredAuthToken());
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(hasTokenOnBoot);

  const applyUserState = (authUser: AuthUser | null) => {
    setUser(authUser);
    setIsAdmin(authUser?.role === "ADMIN");
    setIsStaff(authUser?.role === "STAFF");
  };

  const shouldRefreshAuth = () => {
    const hasConfiguredApiBase = Boolean(import.meta.env.VITE_API_BASE_URL?.trim());
    const isLocalHost = ["localhost", "127.0.0.1"].includes(window.location.hostname);
    return hasConfiguredApiBase || import.meta.env.DEV || !isLocalHost;
  };

  const refreshAuth = useCallback(async () => {
    if (!shouldRefreshAuth()) {
      applyUserState(null);
      setLoading(false);
      return;
    }

    if (!getStoredAuthToken()) {
      applyUserState(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const { authApi } = await import("@/lib/services/authApi");
      const authUser = await authApi.me();
      applyUserState(authUser);
    } catch {
      applyUserState(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const { authApi } = await import("@/lib/services/authApi");
      await authApi.logout();
    } finally {
      applyUserState(null);
      window.dispatchEvent(new Event("auth-changed"));
    }
  }, []);

  useEffect(() => {
    void refreshAuth();

    const onAuthChanged = () => {
      void refreshAuth();
    };

    window.addEventListener("auth-changed", onAuthChanged);
    return () => window.removeEventListener("auth-changed", onAuthChanged);
  }, [refreshAuth]);

  return (
    <AdminAuthCtx.Provider
      value={{
        user,
        isAdmin,
        isStaff,
        isAdminOrStaff: isAdmin || isStaff,
        loading,
        refreshAuth,
        logout,
      }}
    >
      {children}
    </AdminAuthCtx.Provider>
  );
};
