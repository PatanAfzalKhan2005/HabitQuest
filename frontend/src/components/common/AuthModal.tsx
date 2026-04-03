import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "@/services/api";
import { API_ROOT } from "@/services/api-base";
import { cn } from "../../lib/utils";
import { Github, Mail, X } from "lucide-react";
import { syncBackendUserSession } from "@/features/analytics/quest";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function AuthModal({ isOpen, onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (mode === "register") {
        const response = await API.post("/auth/register", {
          email,
          password,
          firstName: name,
        });
        if (response.data?.token) {
          window.localStorage.setItem("gain_discipline_token", response.data.token);
        }
        syncBackendUserSession(response.data.user, "email");
        onClose();
        window.location.href = "/dashboard";
        return;
      }

      const response = await API.post("/auth/login", { email, password });
      if (response.data?.token) {
        window.localStorage.setItem("gain_discipline_token", response.data.token);
      }
      syncBackendUserSession(response.data.user, "email");
      window.location.href = "/dashboard";
    } catch (err) {
      const message =
        typeof err === "object" &&
        err !== null &&
        "response" in err &&
        typeof (err as any).response?.data?.error === "string"
          ? (err as any).response.data.error
          : err instanceof Error
            ? err.message
            : "Authentication failed";
      setError(message);
      setLoading(false);
    }
  }

  function handleSocial(provider: "google" | "facebook" | "github") {
    if (provider !== "google") {
      setError(`${provider[0].toUpperCase()}${provider.slice(1)} login is not configured yet.`);
      return;
    }

    window.location.href = `${API_ROOT}/auth/google`;
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-md mx-4 rounded-3xl border border-border bg-card/70 backdrop-blur-xl p-6 shadow-2xl"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-md text-muted-foreground hover:bg-muted/40"
            >
              <X size={18} />
            </button>

            <div className="mb-4">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                <Mail size={12} />
                Learning Quest
              </p>
              <h2 className="mt-4 font-display text-2xl font-bold text-foreground">
                {mode === "login" ? "Welcome Back" : "Create your quest profile"}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Glassmorphism UI, social sign-in, and a saved local session are ready so users enter the platform only after authentication.
              </p>
            </div>

            <div className="flex gap-2 bg-transparent rounded-full p-1 mb-4">
              <button
                onClick={() => setMode("login")}
                className={cn(
                  "flex-1 px-4 py-2 rounded-2xl text-sm font-semibold transition-all",
                  mode === "login"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/50 text-muted-foreground hover:bg-muted"
                )}
              >
                Login
              </button>
              <button
                onClick={() => setMode("register")}
                className={cn(
                  "flex-1 px-4 py-2 rounded-2xl text-sm font-semibold transition-all",
                  mode === "register"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card/50 text-muted-foreground hover:bg-muted"
                )}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              {mode === "register" && (
                <div>
                  <label className="block text-sm text-muted-foreground mb-1">Name</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-4 py-2 rounded-xl bg-input border border-border text-foreground"
                    required={mode === "register"}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                  className="w-full px-4 py-2 rounded-xl bg-input border border-border text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-muted-foreground mb-1">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  type="password"
                  autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                  className="w-full px-4 py-2 rounded-xl bg-input border border-border text-foreground"
                  required
                />
              </div>

              {error && <div className="text-sm text-destructive">{error}</div>}

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 transition-all"
              >
                {loading ? "Please wait..." : mode === "login" ? "Login" : "Register"}
              </button>
            </form>

            <div className="my-4 flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <div className="text-xs text-muted-foreground">OR</div>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid gap-3">
              <button
                onClick={() => handleSocial("google")}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-all"
              >
                <svg width="18" height="18" viewBox="0 0 48 48" className="rounded-sm">
                  <path fill="#EA4335" d="M24 9.5c3.9 0 6.6 1.6 8.1 2.9l6-5.8C34.9 4.1 29.9 2 24 2 14.8 2 6.9 7.7 3.5 15.9l7.3 5.7C12.6 15.3 17.7 9.5 24 9.5z"/>
                  <path fill="#34A853" d="M46.5 24c0-1.6-.1-2.9-.4-4.2H24v8.1h12.7c-.6 3.3-2.6 6.1-5.6 7.9l8.5 6.6C43.9 37.3 46.5 31.1 46.5 24z"/>
                  <path fill="#4A90E2" d="M10.8 29.6C9.8 27.4 9.3 25 9.3 22.5s.6-4.9 1.5-7.1L3.5 9.7C1.3 13.3 0 17.6 0 22.5s1.3 9.2 3.5 12.8l7.3-5.7z"/>
                  <path fill="#FBBC05" d="M24 46c6.1 0 11.3-2 15.1-5.4l-8.5-6.6c-2.5 1.7-5.6 2.8-8.6 2.8-6.2 0-11.3-4.1-13.2-9.7l-7.3 5.7C6.9 40.3 14.8 46 24 46z"/>
                </svg>
                <span className="font-semibold">Continue with Google</span>
              </button>
              <button
                onClick={() => handleSocial("facebook")}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-all"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1877F2] text-xs font-bold text-white">f</span>
                <span className="font-semibold">Continue with Facebook</span>
              </button>
              <button
                onClick={() => handleSocial("github")}
                className="w-full inline-flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-border bg-card hover:bg-muted transition-all"
              >
                <Github size={18} />
                <span className="font-semibold">Continue with GitHub</span>
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AuthModal;
