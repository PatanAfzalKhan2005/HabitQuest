const trimmedApiBase = (import.meta.env.VITE_API_BASE_URL as string | undefined)?.replace(/\/+$/, "");

export const API_BASE_URL = trimmedApiBase || "http://127.0.0.1:5000";

export const API_ROOT = `${API_BASE_URL}/api`;
