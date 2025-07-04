// Contact information management
import { getUserEmail } from "../../helpers/userHelpers.js";

// Contact field mappings
const contactFields = [
  "email",
  "Phone",
  "phone",
  "tel",
  "telephone",
  "mobile",
  "cell_phone",
  "cellphone",
];

export function updateContactInfo(userAttrs, user) {
  // Update email
  const emailElement = document.getElementById("userEmailSecondary");
  if (emailElement) {
    let email = userAttrs.email || getUserEmail(user);
    emailElement.textContent = email || "N/A";
  }

  // Update phone number
  const phoneElement = document.getElementById("userPhone");
  if (phoneElement) {
    let phone =
      userAttrs.Phone ||
      userAttrs.phone ||
      userAttrs.tel ||
      userAttrs.telephone ||
      userAttrs.mobile ||
      userAttrs.cell_phone ||
      userAttrs.cellphone ||
      userAttrs["Phone"] ||
      userAttrs["phone"] ||
      "N/A";
    phoneElement.textContent = phone;
  }
}
