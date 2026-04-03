import { useEffect, useState } from "react";
import { Redirect } from "wouter";

export function LoginSuccess() {
  const [status, setStatus] = useState<"loading" | "error" | "done">("loading");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const error = params.get("error");

    if (token) {
      window.localStorage.setItem("gain_discipline_token", token);
      window.localStorage.setItem("token", token);
      setStatus("done");
      return;
    }

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("error");
  }, []);

  if (status === "done") {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-2xl shadow-black/20">
        {status === "loading" ? (
          <>
            <div className="mx-auto mb-6 h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
            <h1 className="font-display text-2xl font-bold text-foreground">Signing you in...</h1>
            <p className="mt-3 text-muted-foreground">Finishing your Google login and preparing your dashboard.</p>
          </>
        ) : (
          <>
            <h1 className="font-display text-2xl font-bold text-foreground">Google sign-in failed</h1>
            <p className="mt-3 text-muted-foreground">
              We could not complete authentication. Please try again from the landing page.
            </p>
            <a
              href="/"
              className="mt-6 inline-flex rounded-xl bg-primary px-5 py-3 font-bold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Back to home
            </a>
          </>
        )}
      </div>
    </div>
  );
}
