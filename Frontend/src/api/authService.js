import axios from "axios";
import { API_BASE } from "./api";

export async function login(username, password) {
  const token = btoa(`${username}:${password}`);
  const res = await axios.get(`${API_BASE}/auth/me`, {
    headers: { Authorization: `Basic ${token}` },
  });
  sessionStorage.setItem("authToken", token); // saved only if login succeeded
  sessionStorage.setItem("username", res.data.username);
}

export function logout() {
  sessionStorage.clear();
}

export const isLoggedIn = () => !!sessionStorage.getItem("authToken");
