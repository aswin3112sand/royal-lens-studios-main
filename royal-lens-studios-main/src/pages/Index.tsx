import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PackageItem } from "@/lib/services/types";
import SiteContainer from "@/components/layout/SiteContainer";
import SectionBlock from "@/components/layout/SectionBlock";
import HeroCameraBackdrop from "@/components/HeroCameraBackdrop";

interface LandingPlan {
  id: string;
  name: string;
  priceLabel: string;
  pitch: string;
  features: string[];
  featured?: boolean;
}

const fallbackPlans: LandingPlan[] = [
  {
    id: "starter",
    name: "Starter Launch",
    priceLabel: "Rs 19,999",
    pitch: "For early-stage creators who need high-conversion visual assets.",
    features: ["Creative direction", "2-hour shoot", "25 retouched assets", "7-day delivery"],
  },
  {
    id: "growth",
    name: "Growth Scale",
    priceLabel: "Rs 39,999",
    pitch: "Built for teams running paid ads and weekly content cycles.",
    features: ["Brand strategy call", "Full-day shoot", "80 retouched assets", "3-day priority delivery"],
    featured: true,
  },
  {
    id: "premium",
    name: "Elite Authority",
    priceLabel: "Custom",
    pitch: "Cinematic campaigns for premium positioning and large launches.",
    features: ["Campaign planning", "Multi-location shoot", "Dedicated creative lead", "Rapid iteration support"],
  },
];

const problemPoints = [
  "Content looks good but does not convert visitors into bookings.",
  "Inconsistent visual style weakens trust in your brand.",
  "Slow delivery blocks campaign launches and paid ad timelines.",
];

const solutionCards = [
  { title: "Conversion-first Creative", body: "Every frame is planned for clicks, trust, and action." },
  { title: "Fast Production System", body: "Tight turnaround model to keep your growth engine moving." },
  { title: "Premium Brand Positioning", body: "Neon-dark visual language crafted for modern high-ticket audiences." },
];

const launchSignals = [
  { label: "Mobile-First Layout", value: "100%" },
  { label: "Creative Delivery", value: "48h" },
  { label: "Conversion Focus", value: "High Intent" },
];

const Index = () => {
  const [apiPackages, setApiPackages] = useState<PackageItem[]>([]);

  useEffect(() => {
    let cancelled = false;

    const idleWindow = window as Window & {
      requestIdleCallback?: (callback: () => void, options?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    const loadPackages = async () => {
      try {
        const { publicApi } = await import("@/lib/services/publicApi");
        const packagesData = await publicApi.getPackages(3);
        if (!cancelled && packagesData.length > 0) {
          setApiPackages(packagesData);
        }
      } catch {
        // Keep local fallback plans when public API is unavailable.
      }
    };

    if (typeof idleWindow.requestIdleCallback === "function") {
      const idleId = idleWindow.requestIdleCallback(loadPackages, { timeout: 4000 });
      return () => {
        cancelled = true;
        idleWindow.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = window.setTimeout(loadPackages, 1600);
    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
    };
  }, []);

  const plans = useMemo<LandingPlan[]>(() => {
    if (!apiPackages.length) {
      return fallbackPlans;
    }

    return apiPackages.map((pkg, index) => ({
      id: String(pkg.id),
      name: pkg.name,
      priceLabel: typeof pkg.price === "number" ? `Rs ${pkg.price.toLocaleString("en-IN")}` : String(pkg.price),
      pitch: pkg.tier ? `${pkg.tier} plan tuned for premium growth goals.` : "Tailored plan for modern creative teams.",
      features:
        Array.isArray(pkg.deliverables) && pkg.deliverables.length > 0
          ? pkg.deliverables.slice(0, 4)
          : fallbackPlans[index % fallbackPlans.length].features,
      featured: Boolean(pkg.isPopular),
    }));
  }, [apiPackages]);

  return (
    <main>
      <section id="home" className="relative overflow-hidden pt-[var(--nav-h-mobile)] md:pt-[var(--nav-h-desktop)]">
        <div className="absolute inset-0 neon-hero-bg" />
        <HeroCameraBackdrop />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(20,20,20,0.24),rgba(20,20,20,0.7))]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(218,165,32,0.18),transparent_45%)]" />

        <SiteContainer className="home-hero-shell relative z-10">
          <div className="home-hero-copy mx-auto w-full max-w-5xl text-center md:mx-0 md:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-background/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/90 backdrop-blur-md">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Cinematic Dark Signature
            </p>

            <h1 className="mt-6 text-[clamp(2.35rem,11vw,3.65rem)] font-extrabold leading-[1.05] sm:text-5xl md:text-7xl">
              Build a <span className="neon-gradient-text">Premium Visual Funnel</span> that Converts.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base text-foreground/85 md:mx-0 md:text-lg">
              High-impact visuals, fast production, and a modern growth-ready look that makes your brand feel expensive at first glance.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start">
              <Button asChild size="lg" className="neon-btn-primary w-full px-8 text-base font-semibold sm:w-auto">
                <Link to="/booking">
                  Book Growth Session <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="neon-btn-outline w-full px-8 text-base font-semibold sm:w-auto">
                <Link to="/contact">
                  Talk to Team <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mx-auto mt-10 grid w-full gap-3 sm:grid-cols-3 md:mx-0 md:max-w-3xl">
              {launchSignals.map((signal) => (
                <article key={signal.label} className="glass rounded-xl px-4 py-3 text-center md:text-left">
                  <p className="text-[11px] uppercase tracking-[0.16em] text-foreground/70">{signal.label}</p>
                  <p className="mt-1 text-lg font-bold text-secondary">{signal.value}</p>
                </article>
              ))}
            </div>
          </div>
        </SiteContainer>

      </section>

      <SectionBlock tone="base">
        <SiteContainer className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              Stop losing revenue to <span className="neon-gradient-text">weak creative</span>.
            </h2>
            <p className="mt-4 text-sm text-foreground/82 md:text-base">
              Most brands spend on ads first and visuals later. That order kills conversion rate and burns budget.
            </p>
            <ul className="mt-6 space-y-3">
              {problemPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-sm text-foreground/85 md:text-base">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-primary shadow-[0_0_10px_rgba(108,92,231,0.9)]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="neon-card overflow-hidden rounded-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80"
              srcSet="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=640&q=80&auto=format 640w, https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=960&q=80&auto=format 960w, https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=1200&q=80&auto=format 1200w"
              sizes="(max-width: 1024px) 100vw, 50vw"
              alt="Creative team planning premium brand visuals"
              loading="lazy"
              decoding="async"
              width={1200}
              height={900}
              className="h-full min-h-[300px] w-full object-cover"
            />
          </div>
        </SiteContainer>
      </SectionBlock>

      <SectionBlock id="solution" tone="alt">
        <SiteContainer className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div
            className="grid gap-4"
          >
            <div className="neon-card rounded-2xl p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary">Performance Snapshot</p>
              <p className="mt-2 text-3xl font-extrabold text-primary">3x Faster</p>
              <p className="mt-2 text-sm text-foreground/75">Delivery cadence for fast-moving campaigns.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="neon-card rounded-xl p-5">
                <p className="text-2xl font-bold text-secondary">48h</p>
                <p className="mt-1 text-xs text-foreground/70">First shortlist</p>
              </div>
              <div className="neon-card rounded-xl p-5">
                <p className="text-2xl font-bold text-accent">100%</p>
                <p className="mt-1 text-xs text-foreground/70">Brand consistency</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-extrabold leading-tight md:text-5xl">
              A complete <span className="neon-gradient-text">growth-aligned solution</span>.
            </h2>
            <p className="mt-4 text-sm text-foreground/82 md:text-base">
              We blend creative direction, production speed, and conversion psychology to make your brand stand out and sell better.
            </p>
            <div className="mt-6 grid gap-4">
              {solutionCards.map((card) => (
                <article key={card.title} className="neon-card rounded-xl border-l-2 border-accent p-5">
                  <h3 className="text-lg font-bold">{card.title}</h3>
                  <p className="mt-1.5 text-sm text-foreground/75">{card.body}</p>
                </article>
              ))}
            </div>
          </div>
        </SiteContainer>
      </SectionBlock>

      <SectionBlock tone="base">
        <SiteContainer>
          <header className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold md:text-5xl">
              Pricing that scales with <span className="neon-gradient-text">your growth stage</span>.
            </h2>
            <p className="mt-4 text-sm text-foreground/78 md:text-base">
              Transparent plans with premium execution quality and rapid delivery.
            </p>
          </header>

          <div
            className="mt-8 grid gap-6 md:grid-cols-3"
          >
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={`neon-card flex h-full flex-col rounded-2xl p-6 ${
                  plan.featured ? "border-primary shadow-[0_0_26px_rgba(108,92,231,0.38)]" : ""
                }`}
              >
                {plan.featured && (
                  <span className="inline-flex rounded-full border border-primary/60 bg-primary/15 px-3 py-1 text-xs font-semibold text-primary">
                    Most Popular
                  </span>
                )}
                <h3 className="mt-4 text-2xl font-bold">{plan.name}</h3>
                <p className="mt-2 text-4xl font-extrabold text-secondary">{plan.priceLabel}</p>
                <p className="mt-3 text-sm text-foreground/75">{plan.pitch}</p>
                <ul className="mt-5 space-y-2.5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm text-foreground/85">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button asChild size="lg" className="neon-btn-primary mt-6 w-full">
                  <Link to="/booking">Choose Plan</Link>
                </Button>
              </article>
            ))}
          </div>
        </SiteContainer>
      </SectionBlock>

      <SectionBlock tone="alt" compact>
        <SiteContainer narrow>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold md:text-5xl">
              Ready for a <span className="neon-gradient-text">high-conversion launch</span>?
            </h2>
            <p className="mt-4 text-sm text-foreground/82 md:text-base">
              We will align your brand visuals, landing assets, and shoot execution to perform in real campaigns.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="neon-btn-primary w-full px-8 sm:w-auto">
                <Link to="/contact">Start Project</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="neon-btn-outline w-full px-8 sm:w-auto">
                <Link to="/services">View Services</Link>
              </Button>
            </div>
          </div>
        </SiteContainer>
      </SectionBlock>
    </main>
  );
};

export default Index;
