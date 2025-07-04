// UI section management
const loginSection = document.getElementById("loginSection");
const profileSection = document.getElementById("profileSection");
const loadingSection = document.getElementById("loadingSection");
const mainNavbar = document.getElementById("mainNavbar");
const logoutBtn = document.getElementById("logoutBtn");

const navCursus = document.getElementById("navCursus");
const navPiscineGo = document.getElementById("navPiscineGo");
const navPiscineJs = document.getElementById("navPiscineJs");
const navTotal = document.getElementById("navTotal");

// Toggle between loading and login states
export function updateSectionVisibility(isLoading) {
  if (isLoading) {
    if (loginSection) loginSection.style.display = "none";
    if (loadingSection) loadingSection.style.display = "block";
    if (profileSection) profileSection.classList.remove("active");
  } else {
    if (loginSection) loginSection.style.display = "flex";
    if (loadingSection) loadingSection.style.display = "none";
    if (profileSection) profileSection.classList.remove("active");
  }
}

// Show profile after successful login
export function showProfile() {
  if (loginSection) loginSection.style.display = "none";
  if (loadingSection) loadingSection.style.display = "none";
  if (profileSection) profileSection.classList.add("active");
}

// Control navbar and navigation visibility
export function showNavLinks(isLoggedIn) {
  if (mainNavbar) {
    mainNavbar.style.display = isLoggedIn ? "flex" : "none";
  }

  if (logoutBtn) {
    logoutBtn.style.display = isLoggedIn ? "flex" : "none";
  }

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
