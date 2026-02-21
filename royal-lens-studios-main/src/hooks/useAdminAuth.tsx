import { useState, useEffect, createContext, useContext } from "react";
import { supabase } from "@/integrations/supabase/client";

interface AdminAuthContext {
  user: any;
  isAdmin: boolean;
  isStaff: boolean;
  isAdminOrStaff: boolean;
  loading: boolean;
}

const AdminAuthCtx = createContext<AdminAuthContext>({
  user: null,
  isAdmin: false,
  isStaff: false,
  isAdminOrStaff: false,
  loading: true,
});

export const useAdminAuth = () => useContext(AdminAuthCtx);

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isStaff, setIsStaff] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkRoles = async (userId: string) => {
    const { data } = await supabase
      .from("user_roles" as any)
      .select("role")
      .eq("user_id", userId);
    const roles = (data as any[])?.map((r: any) => r.role) || [];
    setIsAdmin(roles.includes("admin"));
    setIsStaff(roles.includes("staff"));
    setLoading(false);
  };

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        checkRoles(u.id);
      } else {
        setIsAdmin(false);
        setIsStaff(false);
        setLoading(false);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      const u = session?.user ?? null;
      setUser(u);
      if (u) {
        checkRoles(u.id);
      } else {
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AdminAuthCtx.Provider value={{ user, isAdmin, isStaff, isAdminOrStaff: isAdmin || isStaff, loading }}>
      {children}
    </AdminAuthCtx.Provider>
  );
};
