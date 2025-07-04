// User attributes management
import { updateContactInfo } from "./attributes/contactInfo.js";
import { updateProfessionalInfo } from "./attributes/professionalInfo.js";
import { updateAddressInfo } from "./attributes/addressInfo.js";
import { updateEmergencyInfo } from "./attributes/emergencyInfo.js";
import { updateAboutInfo } from "./attributes/aboutInfo.js";
import { updateOtherInfo } from "./attributes/otherInfo.js";
import { initializeAttributesToggle } from "./attributes/attributeUtils.js";

export function updateUserAttributes(userAttrs, user) {
  updateContactInfo(userAttrs, user);
  updateProfessionalInfo(userAttrs);
  updateAddressInfo(userAttrs);
  updateEmergencyInfo(userAttrs);
  updateAboutInfo(userAttrs);
  updateOtherInfo(userAttrs);
}

export { initializeAttributesToggle } from "./attributes/attributeUtils.js";
