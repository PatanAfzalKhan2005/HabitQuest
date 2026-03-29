import { useCallback, useEffect, useState } from "react";
import API from "@/services/api";
import { API_ROOT } from "@/lib/api-base";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    API.get("/auth/user")
      .then((response) => {
        if (!cancelled) {
          setUser(response.data.user ?? null);
          setIsLoading(false);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setUser(null);
          setIsLoading(false);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const login = useCallback(() => {
    window.location.href = `${API_ROOT}/login?returnTo=/`;
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem("gain_discipline_token");
    window.location.href = `${API_ROOT}/logout`;
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
  };
}
