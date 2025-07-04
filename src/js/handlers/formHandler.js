// Login form setup and handling
import { showError, hideError } from "../ui/errorHandler.js";
import { login, logout } from "../auth.js";
import { updateSectionVisibility, showNavLinks } from "../ui/sections.js";
import { fetchUserData } from "../api.js";
import { updateProfile } from "../ui/profile.js";
import { showProfile } from "../ui/sections.js";

// Setup login form with event handlers
export function setupLoginForm() {
  const loginForm = document.getElementById("loginForm");
  const identifierInput = document.getElementById("identifier");
  const passwordInput = document.getElementById("password");

  if (!loginForm) return;

  // Prevent duplicate listeners
  const newForm = loginForm.cloneNode(true);
  loginForm.parentNode.replaceChild(newForm, loginForm);

  const newIdentifierInput = newForm.querySelector("#identifier");
  const newPasswordInput = newForm.querySelector("#password");

  // Input event handlers
  [newIdentifierInput, newPasswordInput].forEach((input) => {
    input?.addEventListener("input", (e) => {
      hideError();
    });

    input?.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        newForm.dispatchEvent(new Event("submit"));
      }
    });
  });

  // Auto-focus first empty field
  if (newIdentifierInput && !newIdentifierInput.value) {
    newIdentifierInput.focus();
  } else if (newPasswordInput && !newPasswordInput.value) {
    newPasswordInput.focus();
  }

  newForm.addEventListener("submit", handleLoginSubmit);
}

async function handleLoginSubmit(e) {
  e.preventDefault();

  const identifier = document.getElementById("identifier").value;
  const password = document.getElementById("password").value;
  const submitButton = e.target.querySelector('button[type="submit"]');

  // Prevent double submission
  if (submitButton.disabled) {
    return;
  }

  // Hide previous error message
  hideError();

  // Client-side validation
  if (!identifier.trim()) {
    showError("Please enter your username or email address.");
    document.getElementById("identifier").focus();
    return;
  }

  if (!password.trim()) {
    showError("Please enter your password.");
    document.getElementById("password").focus();
    return;
  }

  if (password.length < 3) {
    showError("Password must be at least 3 characters long.");
    document.getElementById("password").focus();
    return;
  }

  try {
    // Show loading state
    setButtonLoading(submitButton, true);
    updateSectionVisibility(true);

    // Add loading feedback
    showLoadingFeedback();

    const token = await login(identifier, password);

    if (token) {
      // Show success feedback
      showSuccessFeedback();

      // Enable navigation and load profile
      showNavLinks(true);
      await loadUserProfile();
    }
  } catch (error) {
    // Error handling
    hideLoadingFeedback();
    const errorMessage = getErrorMessage(error);
    showError(errorMessage);
    updateSectionVisibility(false);

    // Focus on relevant field based on error type
    if (errorMessage.includes("username") || errorMessage.includes("email")) {
      document.getElementById("identifier").focus();
    } else if (errorMessage.includes("password")) {
      document.getElementById("password").focus();
    }
  } finally {
    // Remove loading state
    setButtonLoading(submitButton, false);
    hideLoadingFeedback();
  }
}

async function loadUserProfile() {
  try {
    const userData = await fetchUserData();

    if (!userData) {
      throw new Error(
        "No profile data available. Please try logging in again."
      );
    }

    // Update profile with user data
    await updateProfile(userData);

    // Show profile after successful loading
    showProfile();
  } catch (error) {
    // Logout user if profile data cannot be loaded
    logout();
    showNavLinks(false);

    showError(
      error.message || "Failed to load profile data. Please log in again.",
      false
    );
    updateSectionVisibility(false);
  }
}

function setButtonLoading(button, loading) {
  if (button) {
    button.disabled = loading;
    const btnText = button.querySelector(".btn-text") || button;

    if (loading) {
      button.classList.add("loading");
      if (btnText !== button) {
        btnText.textContent = "Signing in...";
      }
    } else {
      button.classList.remove("loading");
      if (btnText !== button) {
        btnText.textContent = "Login";
      }
    }
  }
}

// Helper functions for feedback
function showLoadingFeedback() {
  const card = document.querySelector(".login-card");
  if (card) {
    card.classList.add("loading-state");
  }
}

function hideLoadingFeedback() {
  const card = document.querySelector(".login-card");
  if (card) {
    card.classList.remove("loading-state");
  }
}

function showSuccessFeedback() {
  const card = document.querySelector(".login-card");
  if (card) {
    card.classList.add("success-state");
    setTimeout(() => {
      card.classList.remove("success-state");
    }, 1500);
  }
}

function getErrorMessage(error) {
  const message = error.message || "Login failed. Please try again.";

  // Provide specific error messages
  if (message.includes("401") || message.includes("unauthorized")) {
    return "Invalid username/email or password. Please check your credentials.";
  }
  if (message.includes("404") || message.includes("not found")) {
    return "Username or email not found. Please check your credentials.";
  }
  if (message.includes("network") || message.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  if (message.includes("timeout")) {
    return "Request timed out. Please try again.";
  }

  return message;
}
