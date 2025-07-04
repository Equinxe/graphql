// Emergency information management
import { formatAttrKey } from "./attributeUtils.js";

// Emergency field mappings
const emergencyFields = [
  "emergency_contact",
  "emergencyContact",
  "emergency_phone",
  "emergencyPhone",
  "emergency_name",
  "emergencyName",
  "emergency_relationship",
  "emergencyRelationship",
  "emergency_email",
  "emergencyEmail",
  "contact_emergency",
  "contactEmergency",
  "medical_condition",
  "medicalCondition",
  "medical_info",
  "medicalInfo",
  "allergies",
  "medication",
  "blood_type",
  "bloodType",
];

export function updateEmergencyInfo(userAttrs) {
  const emergencyContainer = document.getElementById("emergencyAttrs");
  if (!emergencyContainer) {
    return;
  }

  const emergencyItems = [];

  // Add predefined emergency fields
  emergencyFields.forEach((field) => {
    const value = userAttrs[field];
    if (value && value !== "N/A" && value !== "") {
      emergencyItems.push({
        key: formatAttrKey(field),
        value: value,
        icon: "🚨",
      });
    }
  });

  // Search for emergency-related keywords in all attributes
  Object.keys(userAttrs).forEach((key) => {
    const lowerKey = key.toLowerCase();
    const value = userAttrs[key];

    if (
      value &&
      value !== "N/A" &&
      value !== "" &&
      (lowerKey.includes("emergency") ||
        lowerKey.includes("contact") ||
        lowerKey.includes("medical") ||
        lowerKey.includes("allerg") ||
        lowerKey.includes("blood") ||
        lowerKey.includes("health")) &&
      !emergencyItems.some((item) => item.key === formatAttrKey(key))
    ) {
      emergencyItems.push({
        key: formatAttrKey(key),
        value: value,
        icon: "🚨",
      });
    }
  });

  if (emergencyItems.length > 0) {
    const html = emergencyItems
      .map(
        (item) => `
      <div class="info-item">
        <span class="info-icon">${item.icon}</span>
        <span class="info-label">${item.key}:</span>
        <span class="info-value">${item.value}</span>
      </div>
    `
      )
      .join("");

    emergencyContainer.innerHTML = html;
  } else {
    emergencyContainer.innerHTML =
      '<div class="info-item"><span class="info-value">No emergency information available</span></div>';
  }
}
