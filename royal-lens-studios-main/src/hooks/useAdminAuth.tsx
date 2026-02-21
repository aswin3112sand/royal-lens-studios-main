import { useState, useEffect, createContext, useContext, useCallback } from "react";
import { authApi } from "@/lib/services/authApi";
import { extractApiErrorMessage } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import type { AuthUser } from "@/lib/services/types";

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
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const applyUserState = (authUser: AuthUser | null) => {
    setUser(authUser);
    setIsAdmin(authUser?.role === "ADMIN");
    setIsStaff(authUser?.role === "STAFF");
  };

  const refreshAuth = useCallback(async () => {
    setLoading(true);
    try {
      const authUser = await authApi.me();
      applyUserState(authUser);
    } catch (error) {
      applyUserState(null);
      toast({
        title: "Authentication Error",
        description: extractApiErrorMessage(error, "Unable to verify login session."),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const logout = useCallback(async () => {
    try {
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
