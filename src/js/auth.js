// This file handles authentication-related functions
const API_BASE = "https://zone01normandie.org/api";
const AUTH_ENDPOINT = `${API_BASE}/auth/signin`;

let currentToken = localStorage.getItem("zone01_token");

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
    currentToken = token.replace(/"/g, ""); // Remove quotes if present
    localStorage.setItem("zone01_token", currentToken);
    return currentToken;
  } catch (error) {
    console.error("Login error:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
}

export function logout() {
  currentToken = null;
  localStorage.removeItem("zone01_token");
  // Update UI sections
  const loginSection = document.getElementById("loginSection");
  const profileSection = document.getElementById("profileSection");
  const loadingSection = document.getElementById("loadingSection");
  if (loginSection) loginSection.style.display = "flex";
  if (profileSection) profileSection.classList.remove("active");
  if (loadingSection) loadingSection.style.display = "none";
}

export function getCurrentToken() {
  if (!currentToken) {
    currentToken = localStorage.getItem("zone01_token");
  }
  return currentToken;
}
