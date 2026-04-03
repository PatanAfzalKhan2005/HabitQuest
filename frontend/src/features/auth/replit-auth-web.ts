import { useCallback, useEffect, useState } from "react";
import API from "@/services/api";
import { API_ROOT } from "@/services/api-base";
import {
  AUTH_EVENT,
  getCurrentUser,
  logoutUser,
  syncBackendUserSession,
  syncDailyLogin,
} from "@/features/analytics/quest";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      try {
        const response = await API.get("/auth/user");
        if (!cancelled) {
          if (response.data.user) {
            syncBackendUserSession(response.data.user, "email");
            syncDailyLogin();
            setUser(response.data.user);
          } else {
            const localUser = getCurrentUser();
            setUser(localUser);
          }
        }
      } catch {
        if (!cancelled) {
          const localUser = getCurrentUser();
          setUser(localUser);
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    }

    const handleAuthChange = () => {
      setUser(getCurrentUser());
      setIsLoading(false);
    };

    hydrate();
    window.addEventListener(AUTH_EVENT, handleAuthChange);
    return () => {
      cancelled = true;
      window.removeEventListener(AUTH_EVENT, handleAuthChange);
    };
  }, []);

  const login = useCallback((provider: "google" | "facebook" | "github" = "google") => {
    if (provider !== "google") {
      throw new Error(`${provider} login is not configured`);
    }
    window.location.href = `${API_ROOT}/auth/google`;
  }, []);

  const logout = useCallback(async () => {
    try {
      await API.get("/logout");
    } catch {
      // Keep local cleanup even if the backend request fails.
    }
    window.localStorage.removeItem("gain_discipline_token");
    window.localStorage.removeItem("token");
    logoutUser();
    setUser(null);
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
}
