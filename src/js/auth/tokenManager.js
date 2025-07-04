// Token storage management
let currentToken = localStorage.getItem("zone01_token");

export function getCurrentToken() {
  if (!currentToken) {
    currentToken = localStorage.getItem("zone01_token");
  }
  return currentToken;
}

export function setCurrentToken(token) {
  currentToken = token;
  localStorage.setItem("zone01_token", token);
}

export function removeCurrentToken() {
  currentToken = null;
  localStorage.removeItem("zone01_token");
}

export function clearUserData() {
  const keysToRemove = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (
      key &&
      (key.startsWith("zone01_") ||
        key.includes("user") ||
        key.includes("profile"))
    ) {
      keysToRemove.push(key);
    }
  }

  keysToRemove.forEach((key) => localStorage.removeItem(key));
  sessionStorage.clear();
}
