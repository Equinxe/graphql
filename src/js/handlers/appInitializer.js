// Application initialization
import { validateToken } from "../auth/tokenValidator.js";
import { getCurrentToken } from "../auth/tokenManager.js";
import { logout } from "../auth/logoutHandler.js";
import { setupLoginForm } from "./formHandler.js";
import { setupLogoutButton } from "./logoutHandler.js";
import { fetchUserData } from "../api.js";
import { updateProfile } from "../ui/profile.js";
import { showError } from "../ui/errorHandler.js";
import {
  updateSectionVisibility,
  showNavLinks,
  showProfile,
} from "../ui/sections.js";
import { initChiaroscuroBackground } from "../effects/chiaroscuro-background.js";

// Initialize app, validate token, and load user profile
export async function initializeApp() {
  initChiaroscuroBackground();

  const token = getCurrentToken();

  if (!token) {
    initializeLoginMode();
    return;
  }

  try {
    const isValid = await validateToken(token);
    if (!isValid) {
      logout();
      return;
    }

    await loadUserProfile();
  } catch (error) {
    showError("Failed to initialize application");
    logout();
  }
}

// Setup login form and handlers
function initializeLoginMode() {
  updateSectionVisibility(false);
  showNavLinks(false);
  setupLoginForm();
  setupLogoutButton();
}

// Load user profile and show dashboard
async function loadUserProfile() {
  try {
    const userData = await fetchUserData();

    if (!userData) {
      throw new Error(
        "No profile data available. Please try logging in again."
      );
    }

    await updateProfile(userData);
    showProfile();
    showNavLinks(true);
  } catch (error) {
    logout();
    showNavLinks(false);
    showError(
      error.message || "Failed to load profile data. Please log in again.",
      false
    );
    updateSectionVisibility(false);
  }
}
