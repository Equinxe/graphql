import { login, logout } from "./auth.js";
import { fetchUserData } from "./api.js";
import { createCumulativeXPChart } from "./charts/xpCharts.js";
import { createPieChart, createAuditRatioChart } from "./charts/pieChart.js";
import { updateSectionVisibility, showNavLinks } from "./ui/sections.js";
import { updateProfile } from "./ui/profile.js";
import { initChiaroscuroBackground } from "./effects/chiaroscuro-background.js";

// Gestionnaire d'événements pour le formulaire de connexion
document.addEventListener("DOMContentLoaded", () => {
  // Initialiser le fond animé dès le chargement de la page
  initChiaroscuroBackground();

  const loginForm = document.getElementById("loginForm");
  const logoutBtn = document.getElementById("logoutBtn");

  loginForm?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const identifier = document.getElementById("identifier").value;
    const password = document.getElementById("password").value;

    try {
      // Afficher le loading
      updateSectionVisibility(true);
      const token = await login(identifier, password);

      if (token) {
        // Activer la navigation et charger le profil
        showNavLinks(true);
        await loadUserProfile();
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage = document.getElementById("errorMessage");
      if (errorMessage) {
        errorMessage.textContent =
          error.message || "Login failed. Please check your credentials.";
        errorMessage.style.display = "block";
      }
      updateSectionVisibility(false);
    }
  });

  // Gestionnaire de déconnexion
  logoutBtn?.addEventListener("click", () => {
    logout();
    showNavLinks(false);
  });
});

async function loadUserProfile() {
  try {
    const userData = await fetchUserData();
    if (!userData) {
      throw new Error("No user data received");
    }

    console.log("User data loaded:", userData);

    // Utiliser la fonction updateProfile du module profile
    await updateProfile(userData);

    // Cacher le loading
    updateSectionVisibility(false);
  } catch (error) {
    console.error("Error loading profile:", error);
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
      errorMessage.textContent =
        "Failed to load profile data. Please try again.";
      errorMessage.style.display = "block";
    }
    updateSectionVisibility(false);
  }
}
