// Other information management
import { formatAttrKey } from "./attributeUtils.js";

// Other field mappings
const otherFields = [
  "notes",
  "note",
  "comments",
  "comment",
  "description",
  "bio",
  "biography",
  "about",
  "info",
  "additional_info",
  "additionalInfo",
  "hobbies",
  "interests",
  "skills",
  "qualifications",
  "certifications",
  "education",
  "languages",
  "projects",
  "achievements",
  "awards",
  "references",
  "linkedin",
  "twitter",
  "facebook",
  "instagram",
  "github",
  "website",
  "blog",
  "portfolio",
  "resume",
  "cv",
];

export function updateOtherInfo(userAttrs) {
  const otherContainer = document.getElementById("otherAttrsContent");
  if (!otherContainer) {
    return;
  }

  const otherItems = [];
  const addedFields = new Set();

  // Add predefined other fields
  otherFields.forEach((field) => {
    const value = userAttrs[field];
    if (value && value !== "N/A" && value !== "") {
      otherItems.push({
        key: formatAttrKey(field),
        value: value,
        icon: "📄",
      });
      addedFields.add(field);
    }
  });

  // Add remaining fields that don't fit other categories
  Object.keys(userAttrs).forEach((key) => {
    const lowerKey = key.toLowerCase();
    const value = userAttrs[key];

    if (
      value &&
      value !== "N/A" &&
      value !== "" &&
      !addedFields.has(key) &&
      // Skip categorized fields
      !lowerKey.includes("address") &&
      !lowerKey.includes("street") &&
      !lowerKey.includes("city") &&
      !lowerKey.includes("postal") &&
      !lowerKey.includes("country") &&
      !lowerKey.includes("emergency") &&
      !lowerKey.includes("medical") &&
      !lowerKey.includes("company") &&
      !lowerKey.includes("position") &&
      !lowerKey.includes("situation") &&
      !lowerKey.includes("email") &&
      !lowerKey.includes("phone") &&
      !lowerKey.includes("firstname") &&
      !lowerKey.includes("lastname") &&
      !lowerKey.includes("birth") &&
      !lowerKey.includes("gender") &&
      key !== "id" &&
      key !== "login" &&
      key !== "createdAt" &&
      key !== "updatedAt"
    ) {
      otherItems.push({
        key: formatAttrKey(key),
        value: value,
        icon: "📄",
      });
      addedFields.add(key);
    }
  });

  if (otherItems.length > 0) {
    const html = otherItems
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

    otherContainer.innerHTML = html;
  } else {
    otherContainer.innerHTML =
      '<div class="info-item"><span class="info-value">No other information available</span></div>';
  }
}
