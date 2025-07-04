// Authentication service - Zone01 Basic Auth with JWT
import { setCurrentToken } from "./tokenManager.js";

const API_BASE = "https://zone01normandie.org/api";
const AUTH_ENDPOINT = `${API_BASE}/auth/signin`;

export async function login(identifier, password) {
  const credentials = btoa(`${identifier}:${password}`);

  try {
    const response = await fetch(AUTH_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${credentials}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const token = await response.text();
    const cleanToken = token.replace(/"/g, ""); // Remove quotes if present
    setCurrentToken(cleanToken);
    return cleanToken;
  } catch (error) {
    throw new Error("Login failed. Please check your credentials.");
  }
}
