import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, Eye, EyeOff, Loader2, Lock, Mail, Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { authApi } from "@/lib/services/authApi";
import { extractApiErrorMessage } from "@/lib/api";
import {
  hasAuthErrors,
  type AuthField,
  type AuthFieldErrors,
  type AuthFormValues,
  validateAuthForm,
} from "@/lib/validation/authValidation";
import { fadeSlideUp } from "@/lib/motion";

const Auth = () => {
  const [searchParams] = useSearchParams();
  const [isLogin, setIsLogin] = useState(true);
  const [formValues, setFormValues] = useState<AuthFormValues>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [apiError, setApiError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    setIsLogin(searchParams.get("tab") !== "signup");
    setErrors({});
    setApiError("");
  }, [searchParams]);

  useEffect(() => {
    let active = true;

    authApi
      .me()
      .then((user) => {
        if (active && user) {
          navigate("/booking");
        }
      })
      .catch(() => {
        // ignore unauthenticated state on auth screen
      });

    return () => {
      active = false;
    };
  }, [navigate]);

  const content = useMemo(
    () =>
      isLogin
        ? {
            heading: "Welcome Back",
            subtitle: "Sign in to manage your bookings and session updates.",
            cta: "Sign In",
            switchPrompt: "Don't have an account?",
            switchAction: "Create Account",
          }
        : {
            heading: "Create Your Account",
            subtitle: "Register once and book premium photo sessions in minutes.",
            cta: "Create Account",
            switchPrompt: "Already have an account?",
            switchAction: "Sign In",
          },
    [isLogin],
  );

  const updateField = (field: AuthField, value: string) => {
    setFormValues((current) => ({ ...current, [field]: value }));
    setApiError("");
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const getInputClassName = (field: AuthField, withLeftIcon = true) =>
    [
      "h-11 rounded-lg bg-background/55",
      withLeftIcon ? "pl-10" : "",
      field === "password" || field === "confirmPassword" ? "pr-12" : "",
      errors[field] ? "border-destructive/70 focus-visible:ring-destructive" : "",
    ]
      .filter(Boolean)
      .join(" ");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAuthForm(formValues, isLogin);
    setErrors(validationErrors);

    if (hasAuthErrors(validationErrors)) {
      return;
    }

    setApiError("");
    setLoading(true);

    try {
      if (isLogin) {
        await authApi.login({
          email: formValues.email.trim(),
          password: formValues.password,
        });
      } else {
        await authApi.register({
          email: formValues.email.trim(),
          password: formValues.password,
          fullName: formValues.fullName.trim(),
        });
        toast({ title: "Account Created", description: "Welcome to Photographer." });
      }

      window.dispatchEvent(new Event("auth-changed"));
      navigate("/booking");
    } catch (error) {
      const message = extractApiErrorMessage(error, "Please check your details and try again.");
      setApiError(message);
      toast({
        title: isLogin ? "Login Failed" : "Sign Up Failed",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-[100svh] overflow-hidden pt-[var(--nav-h-mobile)] md:pt-[var(--nav-h-desktop)]">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
          alt=""
          loading="eager"
          decoding="async"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-background/88 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 flex min-h-[calc(100svh-var(--nav-h-mobile))] items-center justify-center px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:min-h-[calc(100svh-var(--nav-h-desktop))] md:py-8">
        <motion.section
          data-testid="auth-shell"
          initial="hidden"
          animate="visible"
          variants={fadeSlideUp}
          className="gold-glow-border w-full max-w-[460px] rounded-2xl border border-primary/30 bg-card/80 p-5 backdrop-blur-xl sm:p-6 md:p-8"
        >
          <header className="text-center">
            <Crown className="mx-auto h-9 w-9 text-primary" />
            <h1 className="mt-3 text-3xl font-extrabold">{content.heading}</h1>
            <p className="mt-2 text-sm text-foreground/75">{content.subtitle}</p>
            <div className="mt-3 inline-flex items-center gap-1 text-xs text-foreground/70">
              <Star className="h-3.5 w-3.5 fill-secondary text-secondary" /> Join 5,000+ happy clients
            </div>
          </header>

          <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="auth-fullName">Full Name</Label>
                <div className="relative">
                  <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/55" />
                  <Input
                    id="auth-fullName"
                    value={formValues.fullName}
                    onChange={(e) => updateField("fullName", e.target.value)}
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-invalid={Boolean(errors.fullName)}
                    aria-describedby={errors.fullName ? "auth-fullName-error" : undefined}
                    required
                    className={getInputClassName("fullName")}
                  />
                </div>
                {errors.fullName && (
                  <p id="auth-fullName-error" className="text-xs text-destructive">
                    {errors.fullName}
                  </p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="auth-email">Email Address</Label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/55" />
                <Input
                  id="auth-email"
                  type="email"
                  value={formValues.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  placeholder="you@example.com"
                  autoComplete="email"
                  inputMode="email"
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "auth-email-error" : undefined}
                  required
                  className={getInputClassName("email")}
                />
              </div>
              {errors.email && (
                <p id="auth-email-error" className="text-xs text-destructive">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="auth-password">Password</Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/55" />
                <Input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={formValues.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete={isLogin ? "current-password" : "new-password"}
                  aria-invalid={Boolean(errors.password)}
                  aria-describedby={errors.password ? "auth-password-error" : undefined}
                  required
                  minLength={6}
                  className={getInputClassName("password")}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((current) => !current)}
                  className="ring-focus absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-foreground/70 hover:text-secondary"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.password && (
                <p id="auth-password-error" className="text-xs text-destructive">
                  {errors.password}
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="auth-confirmPassword">Confirm Password</Label>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground/55" />
                  <Input
                    id="auth-confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formValues.confirmPassword}
                    onChange={(e) => updateField("confirmPassword", e.target.value)}
                    placeholder="Re-enter password"
                    autoComplete="new-password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    aria-describedby={errors.confirmPassword ? "auth-confirmPassword-error" : undefined}
                    required
                    minLength={6}
                    className={getInputClassName("confirmPassword")}
                  />
                  <button
                    type="button"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    className="ring-focus absolute right-2 top-1/2 inline-flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-foreground/70 hover:text-secondary"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="auth-confirmPassword-error" className="text-xs text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}

            {apiError && (
              <div className="rounded-lg border border-destructive/60 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {apiError}
              </div>
            )}

            <Button type="submit" disabled={loading} className="neon-btn-primary min-h-11 w-full font-semibold">
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Please wait...
                </>
              ) : (
                content.cta
              )}
            </Button>
          </form>

          <div className="mt-5 space-y-3 text-center">
            <p className="text-sm text-foreground/72">
              {content.switchPrompt}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLogin((prev) => !prev);
                  setErrors({});
                  setApiError("");
                }}
                className="font-medium text-primary hover:text-secondary"
              >
                {content.switchAction}
              </button>
            </p>

            <p className="text-xs text-foreground/62">
              Need help with account access?{" "}
              <Link to="/contact" className="font-medium text-secondary hover:text-primary">
                Contact support
              </Link>
            </p>
          </div>
        </motion.section>
      </div>
    </main>
  );
};

export default Auth;
