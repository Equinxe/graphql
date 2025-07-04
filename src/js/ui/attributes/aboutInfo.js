// Personal information management
import { formatAttrKey } from "./attributeUtils.js";

export function updateAboutInfo(userAttrs) {
  const aboutContainer = document.getElementById("aboutAttrs");
  if (!aboutContainer) {
    return;
  }

  const aboutItems = [];

  // Priority fields for About section
  const priorityOrder = [
    "firstName",
    "first_name",
    "lastName",
    "last_name",
    "gender",
    "sex",
    "dateOfBirth",
    "date_of_birth",
    "birth_date",
    "birthDate",
    "placeOfBirth",
    "place_of_birth",
    "birth_place",
    "birthPlace",
    "countryOfBirth",
    "country_of_birth",
    "birth_country",
    "birthCountry",
  ];

  // Process fields in priority order
  priorityOrder.forEach((field) => {
    const value = userAttrs[field];
    if (value && value !== "N/A" && value !== "" && value !== null) {
      // Format date fields
      let displayValue = value;
      if (field.includes("Birth") || field.includes("birth")) {
        if (typeof value === "string" && value.includes("T")) {
          displayValue = new Date(value).toLocaleDateString();
        }
      }

      aboutItems.push({
        key: formatAttrKey(field),
        value: displayValue,
        icon: "👤",
      });
    }
  });

  if (aboutItems.length > 0) {
    const html = aboutItems
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

    aboutContainer.innerHTML = html;
  } else {
    aboutContainer.innerHTML =
      '<div class="info-item"><span class="info-value">No personal information available</span></div>';
  }
}
