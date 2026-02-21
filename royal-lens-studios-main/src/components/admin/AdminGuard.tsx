import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isAdminOrStaff, loading } = useAdminAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-xl p-10 max-w-md mx-4">
          <Shield className="w-12 h-12 text-gold mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2">Authentication Required</h2>
          <p className="text-muted-foreground mb-6">Please sign in to access the admin panel.</p>
          <Button className="bg-gold text-royal-dark hover:bg-gold-light" onClick={() => navigate("/auth")}>Sign In</Button>
        </div>
      </div>
    );
  }

  if (!isAdminOrStaff) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass rounded-xl p-10 max-w-md mx-4">
          <Shield className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="font-serif text-2xl font-bold mb-2">Access Denied</h2>
          <p className="text-muted-foreground mb-6">You don't have admin or staff permissions.</p>
          <Button variant="outline" onClick={() => navigate("/")}>Go Home</Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default AdminGuard;
