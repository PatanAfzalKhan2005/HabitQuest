import axios from "axios";
import { API_ROOT } from "@/lib/api-base";

const API = axios.create({
  baseURL: API_ROOT,
  withCredentials: true,
});

API.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("gain_discipline_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
