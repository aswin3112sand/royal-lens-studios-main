import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Mail, Lock, User, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/lib/services/authApi";
import { extractApiErrorMessage } from "@/lib/api";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(searchParams.get("tab") !== "signup");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    authApi.me().then((user) => {
      if (user) navigate("/booking");
    }).catch(() => {
      // Ignore unauthenticated boot state for auth page.
    });
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await authApi.login({ email, password });
      } else {
        await authApi.register({ email, password, fullName: name });
        toast({ title: "Account Created!", description: "Welcome to Photographer." });
      }
      window.dispatchEvent(new Event("auth-changed"));
      navigate("/booking");
    } catch (error) {
      toast({
        title: isLogin ? "Login Failed" : "Sign Up Failed",
        description: extractApiErrorMessage(error, "Please check your details and try again."),
        variant: "destructive",
      });
    }
    setLoading(false);
  };

  return (
    <main className="relative min-h-screen flex items-center justify-center pt-20 pb-10 px-4 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt=""
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-background/85 backdrop-blur-sm" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md glass rounded-xl p-8 gold-glow-border"
      >
        <div className="text-center mb-8">
          <Crown className="w-10 h-10 text-gold mx-auto mb-3" />
          <h2 className="font-serif text-3xl font-bold">{isLogin ? "Welcome Back" : "Join Us"}</h2>
          <p className="text-muted-foreground text-sm mt-2">
            {isLogin ? "Sign in to manage your bookings" : "Create an account to book sessions"}
          </p>
          <div className="flex items-center justify-center gap-1 mt-3 text-xs text-muted-foreground">
            <Star className="w-3 h-3 text-gold fill-gold" />
            Join 5,000+ happy clients
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="relative">
              <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="pl-10 bg-background/50" />
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="pl-10 bg-background/50" />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={6} className="pl-10 bg-background/50" />
          </div>
          <Button type="submit" disabled={loading} className="w-full bg-gold text-background hover:bg-gold-light font-semibold">
            {loading ? "Please wait..." : isLogin ? "Sign In" : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button onClick={() => setIsLogin(!isLogin)} className="text-gold hover:underline font-medium">
            {isLogin ? "Sign Up" : "Sign In"}
          </button>
        </p>
      </motion.div>
    </main>
  );
};

export default Auth;
