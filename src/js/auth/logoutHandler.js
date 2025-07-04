// Logout functionality
import { removeCurrentToken, clearUserData } from "./tokenManager.js";

function resetProfileElements() {
  const elementsToReset = [
    "userName",
    "userEmail",
    "userId",
    "userCampus",
    "userGithub",
    "userCreated",
    "totalXP",
    "piscineGoXP",
    "piscineJsXP",
    "cursusXP",
    "projectsCount",
    "auditRatio",
  ];

  elementsToReset.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = "Loading...";
    }
  });
}

function updateUIForLogout() {
  const loginSection = document.getElementById("loginSection");
  const profileSection = document.getElementById("profileSection");
  const loadingSection = document.getElementById("loadingSection");
  const mainNavbar = document.getElementById("mainNavbar");

  if (loginSection) loginSection.style.display = "flex";
  if (profileSection) profileSection.classList.remove("active");
  if (loadingSection) loadingSection.style.display = "none";
  if (mainNavbar) mainNavbar.style.display = "none";
}

export function logout() {
  removeCurrentToken();
  clearUserData();
  updateUIForLogout();
  resetProfileElements();
}
