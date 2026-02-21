import type { ErrorInfo, ReactNode } from "react";
import { Component } from "react";

interface StartupErrorBoundaryProps {
  children: ReactNode;
}

interface StartupErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

const ENV_KEYS = [
  "VITE_SUPABASE_URL",
  "VITE_SUPABASE_PUBLISHABLE_KEY",
  "VITE_SUPABASE_PROJECT_ID",
];

const extractMissingKeys = (message: string) =>
  ENV_KEYS.filter((key) => message.includes(key));

class StartupErrorBoundary extends Component<
  StartupErrorBoundaryProps,
  StartupErrorBoundaryState
> {
  state: StartupErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): StartupErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("StartupErrorBoundary caught a startup error:", error, info);
  }

  render() {
    if (!this.state.hasError || !this.state.error) {
      return this.props.children;
    }

    const message = this.state.error.message || "Unknown startup error";
    const missingKeys = extractMissingKeys(message);

    return (
      <main className="min-h-screen bg-background text-foreground px-4 py-10">
        <div className="max-w-2xl mx-auto glass rounded-xl p-6 md:p-8 border border-destructive/40">
          <h1 className="font-serif text-2xl md:text-3xl font-bold text-destructive mb-3">
            Deployment configuration error
          </h1>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            The app failed to start due to missing or invalid environment configuration.
          </p>
          <div className="rounded-md bg-background/60 border border-border p-3 mb-4">
            <p className="text-xs md:text-sm break-words">{message}</p>
          </div>
          <div className="space-y-2 text-sm md:text-base">
            <p className="font-semibold">Next steps:</p>
            <ol className="list-decimal pl-5 space-y-1 text-muted-foreground">
              <li>Open Render service settings for this app.</li>
              <li>Set Root Directory to <code>royal-lens-studios-main</code>.</li>
              <li>Set Build Command to <code>npm run build</code>.</li>
              <li>Set Publish Directory to <code>dist</code>.</li>
              <li>Add required Vite env vars and redeploy.</li>
            </ol>
          </div>
          {missingKeys.length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-2">Missing keys:</p>
              <ul className="list-disc pl-5 text-muted-foreground text-sm">
                {missingKeys.map((key) => (
                  <li key={key}>
                    <code>{key}</code>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </main>
    );
  }
}

export default StartupErrorBoundary;
