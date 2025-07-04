// Error message handling
export function showError(message, autoHide = true) {
  const errorMessage = document.getElementById("errorMessage");
  if (!errorMessage) return;

  errorMessage.textContent = message;
  errorMessage.style.display = "block";
  errorMessage.classList.add("show");

  // Clear existing timeout
  if (errorMessage.hideTimeout) {
    clearTimeout(errorMessage.hideTimeout);
  }

  if (autoHide) {
    errorMessage.hideTimeout = setTimeout(() => {
      hideError();
    }, 6000);
  }
}

export function hideError() {
  const errorMessage = document.getElementById("errorMessage");
  if (errorMessage) {
    errorMessage.classList.remove("show");
    errorMessage.style.display = "none";

    // Clear timeout
    if (errorMessage.hideTimeout) {
      clearTimeout(errorMessage.hideTimeout);
      errorMessage.hideTimeout = null;
    }
  }
}

// Success message handling
export function showSuccess(message, autoHide = true) {
  // Create success element if needed
  let successMessage = document.getElementById("successMessage");
  if (!successMessage) {
    successMessage = document.createElement("div");
    successMessage.id = "successMessage";
    successMessage.className = "success";
    successMessage.style.display = "none";

    // Insert after error message or at form start
    const errorMessage = document.getElementById("errorMessage");
    if (errorMessage) {
      errorMessage.parentNode.insertBefore(
        successMessage,
        errorMessage.nextSibling
      );
    } else {
      const form = document.getElementById("loginForm");
      if (form) {
        form.insertBefore(successMessage, form.firstChild);
      }
    }
  }

  successMessage.textContent = message;
  successMessage.style.display = "block";
  successMessage.classList.add("show");

  // Clear existing timeout
  if (successMessage.hideTimeout) {
    clearTimeout(successMessage.hideTimeout);
  }

  if (autoHide) {
    successMessage.hideTimeout = setTimeout(() => {
      hideSuccess();
    }, 4000);
  }
}

export function hideSuccess() {
  const successMessage = document.getElementById("successMessage");
  if (successMessage) {
    successMessage.classList.remove("show");
    successMessage.style.display = "none";

    // Clear timeout
    if (successMessage.hideTimeout) {
      clearTimeout(successMessage.hideTimeout);
      successMessage.hideTimeout = null;
    }
  }
}

// Clear all messages
export function clearAllMessages() {
  hideError();
  hideSuccess();
}
