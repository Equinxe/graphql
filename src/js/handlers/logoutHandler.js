// Logout event handlers
import { logout } from "../auth.js";
import { updateSectionVisibility, showNavLinks } from "../ui/sections.js";

// Setup logout button event handler
export function setupLogoutButton() {
  const logoutBtn = document.getElementById("logoutBtn");

  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", handleLogout);
}

// Handle logout button click
function handleLogout() {
  logout();
  showNavLinks(false);
  updateSectionVisibility(false);
}
