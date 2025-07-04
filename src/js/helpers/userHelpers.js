// User data helper functions
export function getUserEmail(user) {
  // Try to get email from different sources
  if (user.email) return user.email;
  if (user.attrs && typeof user.attrs === "object" && user.attrs.email)
    return user.attrs.email;
  if (user.attrs && typeof user.attrs === "string") {
    try {
      const parsed = JSON.parse(user.attrs);
      if (parsed.email) return parsed.email;
    } catch (e) {
      // Ignore parse errors
    }
  }
  return "N/A";
}

export function parseUserAttributes(user) {
  try {
    if (user.attrs && typeof user.attrs === "string") {
      const parsed = JSON.parse(user.attrs);
      return parsed;
    }
    return user.attrs || {};
  } catch (e) {
    return {};
  }
}
