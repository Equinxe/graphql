// DOM Elements for sections
const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");
const loadingSection = document.getElementById("loadingSection");
const mainNavbar = document.getElementById("mainNavbar");
const logoutBtn = document.getElementById("logoutBtn");

// Navigation elements
const navCursus = document.getElementById("navCursus");
const navPiscineGo = document.getElementById("navPiscineGo");
const navPiscineJs = document.getElementById("navPiscineJs");
const navTotal = document.getElementById("navTotal");

// Show/hide sections based on loading state
export function updateSectionVisibility(isLoading) {
  if (loginSection) loginSection.style.display = "none";
  if (loadingSection)
    loadingSection.style.display = isLoading ? "block" : "none";
  if (profileSection) profileSection.classList.add("active");
}

// Show/hide navbar and nav links based on login status
export function showNavLinks(isLoggedIn) {
  // Show/hide entire navbar
  if (mainNavbar) {
    mainNavbar.style.display = isLoggedIn ? "flex" : "none";
  }

  // Show/hide logout button
  if (logoutBtn) {
    logoutBtn.style.display = isLoggedIn ? "flex" : "none";
  }

  // Show/hide individual nav links
  if (isLoggedIn) {
    navCursus.style.display = "inline-flex";
    navPiscineGo.style.display = "inline-flex";
    navPiscineJs.style.display = "inline-flex";
    navTotal.style.display = "inline-flex";
  } else {
    navCursus.style.display = "none";
    navPiscineGo.style.display = "none";
    navPiscineJs.style.display = "none";
    navTotal.style.display = "none";
  }
}
