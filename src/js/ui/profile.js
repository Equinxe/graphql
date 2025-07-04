import {
  updateUserAttributes,
  initializeAttributesToggle,
} from "./userAttributes.js";
import { initializeTabListeners, renderTabContent } from "./tabs.js";
import { formatXP, formatAuditRatio } from "../utils.js";
import { getUserEmail, parseUserAttributes } from "../helpers/userHelpers.js";

export async function updateProfile(user) {
  // Update basic user info
  updateBasicInfo(user);

  // Update user attributes
  let userAttrs = parseUserAttributes(user);

  updateUserAttributes(userAttrs, user);
  initializeAttributesToggle();

  // Update statistics from the calculated values
  updateStatistics(user);

  // Initialize and render tabs with the user data
  renderTabContent(user);
  initializeTabListeners(user);
}

function updateBasicInfo(user) {
  const elements = {
    userName: user.login,
    userId: user.id,
    userEmail: getUserEmail(user),
    userGithub: user.login,
    userCreated: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString()
      : "N/A",
    userUpdated: user.updatedAt
      ? new Date(user.updatedAt).toLocaleDateString()
      : "N/A",
    userCampus: user.campus || "N/A",
  };

  for (const [id, value] of Object.entries(elements)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value || "N/A";
    }
  }

  // Also update the secondary email in additional info section
  const emailSecondary = document.getElementById("userEmailSecondary");
  if (emailSecondary) {
    emailSecondary.textContent = getUserEmail(user) || "N/A";
  }
}

function updateStatistics(user) {
  const stats = {
    totalXP: user.totalXP || 0,
    piscineGoXP: user.piscineGoXP || 0,
    piscineJsXP: user.piscineJsXP || 0,
    cursusXP: user.cursusXP || 0,
    projectsCount: user.progresses.filter((p) => p.grade >= 1).length,
    auditRatio: user.auditRatio || 0,
  };

  for (const [id, value] of Object.entries(stats)) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = id.includes("XP")
        ? formatXP(value)
        : id === "auditRatio"
        ? formatAuditRatio(value)
        : value;
    }
  }
}
