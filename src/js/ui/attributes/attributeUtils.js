// Common utilities for user attributes

export function formatAttrKey(key) {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
}

export function formatAttrValue(value) {
  return typeof value === "object" ? JSON.stringify(value) : value;
}

export function initializeAttributesToggle() {
  const additionalInfoSection = document.getElementById(
    "additionalInfoSection"
  );
  const toggleBtn = document.getElementById("toggleAdditionalInfo");

  if (additionalInfoSection && toggleBtn) {
    additionalInfoSection.style.display = "none";
    toggleBtn.style.display = "inline-block";
    toggleBtn.textContent = "+";
    toggleBtn.setAttribute("aria-expanded", "false");
  }
}

// Make toggleAdditionalInfo available globally
window.toggleAdditionalInfo = function () {
  const additionalInfoSection = document.getElementById(
    "additionalInfoSection"
  );
  const toggleBtn = document.getElementById("toggleAdditionalInfo");

  if (additionalInfoSection) {
    const isExpanded = additionalInfoSection.style.display !== "none";
    additionalInfoSection.style.display = isExpanded ? "none" : "block";
    toggleBtn.textContent = isExpanded ? "+" : "-";
    toggleBtn.setAttribute("aria-expanded", !isExpanded);
  }
};
