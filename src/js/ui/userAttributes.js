// Utility function for formatting user attributes
function formatAttrKey(key) {
  return key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, " $1");
}

function formatAttrValue(value) {
  return typeof value === "object" ? JSON.stringify(value) : value;
}

// Contact Information attributes
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

// Professional Information attributes - removing generic fields
const professionalFields = [
  "company",
  "employer",
  "workplace",
  "organization",
  "position",
  "job_title",
  "jobTitle",
  "title",
  "role",
  "occupation",
  "Situation",
  "situation",
  "status",
  "marital_status",
  "maritalStatus",
];

// Address Information attributes
const addressFields = [
  "address",
  "addressStreet",
  "address_street",
  "street",
  "addressCity",
  "address_city",
  "city",
  "addressPostalCode",
  "address_postal_code",
  "postal_code",
  "zip_code",
  "zipcode",
  "addressCountry",
  "address_country",
  "country",
];

// Emergency Information attributes - specific emergency fields
const emergencyFields = [
  "emergencyFirstName",
  "emergency_first_name",
  "emergency_firstname",
  "emergencyLastName",
  "emergency_last_name",
  "emergency_lastname",
  "emergencyTel",
  "emergency_tel",
  "emergency_phone",
  "emergencyPhone",
  "emergencyAffiliation",
  "emergency_affiliation",
  "emergency_contact",
  "emergencyContact",
  "emergency_name",
  "emergencyName",
  "emergency_email",
  "emergencyEmail",
  "medical_info",
  "medicalInfo",
  "allergies",
  "blood_type",
  "bloodType",
];

// About attributes - prioritizing personal info first
const aboutFields = [
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

// Other attributes - moved attentes here
const otherFields = [
  "attentes",
  "expectations",
  "foundus",
  "found_us",
  "foundUs",
  "how_found_us",
  "howFoundUs",
  "mailcheckAccepted",
  "mailcheck_accepted",
  "mail_check_accepted",
  "mailCheckAccepted",
  "referral",
  "source",
  "country",
];

export function updateUserAttributes(userAttrs, user) {
  console.log("=== UPDATE USER ATTRIBUTES ===");
  console.log("Input userAttrs:", userAttrs);
  console.log("User object:", user);
  console.log("User attrs raw:", user.attrs);

  // Use real user data without test data
  const realAttrs = { ...userAttrs };

  // Add debugging for all available fields
  console.log("Available attribute keys:", Object.keys(realAttrs));

  // 1. Update Contact Information (Email, Phone)
  updateContactInfo(realAttrs, user);

  // 2. Update Professional Information (Company, Position)
  updateProfessionalInfo(realAttrs);

  // 3. Update Address Information
  updateAddressInfo(realAttrs);

  // 4. Update Emergency Information
  updateEmergencyInfo(realAttrs);

  // 5. Update About Information
  updateAboutInfo(realAttrs);

  // 6. Update Other Information
  updateOtherInfo(realAttrs);

  console.log("=== ALL SECTIONS UPDATED ===");
}

function updateContactInfo(userAttrs, user) {
  console.log("Updating Contact Info...");
  console.log("Available attrs for contact:", userAttrs);

  // Update Email
  const emailElement = document.getElementById("userEmailSecondary");
  if (emailElement) {
    let email = userAttrs.email || getUserEmail(user);
    emailElement.textContent = email || "N/A";
    console.log("Email updated:", email);
  }

  // Update Phone - check multiple possible fields (including Phone with capital P)
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
      userAttrs["tel"] ||
      "N/A";
    phoneElement.textContent = phone;
    console.log("Phone updated:", phone, "from attrs:", {
      Phone: userAttrs.Phone,
      phone: userAttrs.phone,
      tel: userAttrs.tel,
      telephone: userAttrs.telephone,
      mobile: userAttrs.mobile,
    });
  }
}

function updateProfessionalInfo(userAttrs) {
  console.log("Updating Professional Info...");

  // Update Company
  const companyElement = document.getElementById("userCompany");
  if (companyElement) {
    let company =
      userAttrs.company || userAttrs.employer || userAttrs.workplace || "N/A";
    companyElement.textContent = company;
    console.log("Company updated:", company);
  }

  // Update Position
  const positionElement = document.getElementById("userPosition");
  if (positionElement) {
    let position =
      userAttrs.position ||
      userAttrs.job_title ||
      userAttrs.jobTitle ||
      userAttrs.title ||
      "N/A";
    positionElement.textContent = position;
    console.log("Position updated:", position);
  }

  // Update Situation
  const situationElement = document.getElementById("userSituation");
  if (situationElement) {
    let situation =
      userAttrs.Situation || userAttrs.situation || userAttrs.status || "N/A";
    situationElement.textContent = situation;
    console.log("Situation updated:", situation);
  }
}

function updateAddressInfo(userAttrs) {
  console.log("Updating Address Info...");
  console.log("Address attrs:", {
    addressStreet: userAttrs.addressStreet,
    addressCity: userAttrs.addressCity,
    addressPostalCode: userAttrs.addressPostalCode,
    addressCountry: userAttrs.addressCountry,
  });

  const userAddressContainer = document.getElementById("userAddress");
  if (!userAddressContainer) return;

  // Collect address parts
  const addressParts = [];

  const street =
    userAttrs.addressStreet ||
    userAttrs.address_street ||
    userAttrs.street ||
    "";
  const city =
    userAttrs.addressCity || userAttrs.address_city || userAttrs.city || "";
  const postalCode =
    userAttrs.addressPostalCode ||
    userAttrs.address_postal_code ||
    userAttrs.postal_code ||
    userAttrs.zip_code ||
    "";
  const country =
    userAttrs.addressCountry ||
    userAttrs.address_country ||
    userAttrs.country ||
    "";

  if (street.trim()) addressParts.push(street.trim());
  if (city.trim()) addressParts.push(city.trim());
  if (postalCode.trim()) addressParts.push(postalCode.trim());
  if (country.trim()) addressParts.push(country.trim());

  if (addressParts.length > 0) {
    // Format: "26 rue de vienne, Saint-Etienne-du-Rouvray, 76800 France"
    const formattedAddress = addressParts.join(", ");
    userAddressContainer.innerHTML = `<span>${formattedAddress}</span>`;
    console.log("Address updated:", formattedAddress);
  } else {
    userAddressContainer.innerHTML = '<span style="color: #888;">N/A</span>';
    console.log("No address data found");
  }
}

function updateEmergencyInfo(userAttrs) {
  console.log("Updating Emergency Info...");
  console.log(
    "Emergency attrs available:",
    Object.keys(userAttrs).filter((key) =>
      key.toLowerCase().includes("emergency")
    )
  );

  const emergencyContainer = document.getElementById("emergencyAttrs");
  if (!emergencyContainer) {
    console.log("Emergency container not found!");
    return;
  }

  const emergencyItems = [];

  // Look for emergency fields with debug logging
  emergencyFields.forEach((field) => {
    const value = userAttrs[field];
    console.log(`Checking emergency field '${field}':`, value);
    if (value && value !== "N/A" && value !== "" && value !== null) {
      emergencyItems.push({
        key: formatAttrKey(field),
        value: value,
        icon: "🚨",
      });
    }
  });

  // Also check for any other emergency-related fields
  Object.keys(userAttrs).forEach((key) => {
    if (
      key.toLowerCase().includes("emergency") &&
      !emergencyFields.includes(key)
    ) {
      const value = userAttrs[key];
      if (value && value !== "N/A" && value !== "" && value !== null) {
        console.log(`Found additional emergency field '${key}':`, value);
        emergencyItems.push({
          key: formatAttrKey(key),
          value: value,
          icon: "🚨",
        });
      }
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
    console.log(
      "Emergency items added:",
      emergencyItems.length,
      emergencyItems
    );
  } else {
    emergencyContainer.innerHTML =
      '<div class="info-item"><span class="info-value">No emergency information available</span></div>';
    console.log("No emergency items found");
  }
}

function updateAboutInfo(userAttrs) {
  console.log("Updating About Info...");

  const aboutContainer = document.getElementById("aboutAttrs");
  if (!aboutContainer) {
    console.log("About container not found!");
    return;
  }

  const aboutItems = [];

  // Priority order for About section - using exact field names from data
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
      // Special formatting for date
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

  console.log("About items found:", aboutItems);

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
    console.log("About items added:", aboutItems.length);
  } else {
    aboutContainer.innerHTML =
      '<div class="info-item"><span class="info-value">No personal information available</span></div>';
  }
}

function updateOtherInfo(userAttrs) {
  console.log("Updating Other Info...");

  const otherContainer = document.getElementById("otherAttrsContent");
  if (!otherContainer) {
    console.log("Other container not found!");
    return;
  }

  const otherItems = [];

  // Add predefined other fields
  otherFields.forEach((field) => {
    const value = userAttrs[field];
    if (value && value !== "N/A" && value !== "") {
      otherItems.push({
        key: formatAttrKey(field),
        value: value,
        icon: "📄",
      });
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
    console.log("Other items added:", otherItems.length);
  } else {
    otherContainer.innerHTML =
      '<div class="info-item"><span class="info-value">No other information available</span></div>';
  }
}

// Helper function to get email from user object
function getUserEmail(user) {
  if (user && user.email) return user.email;
  if (user && user.attrs && typeof user.attrs === "object" && user.attrs.email)
    return user.attrs.email;
  if (user && user.attrs && typeof user.attrs === "string") {
    try {
      const parsed = JSON.parse(user.attrs);
      if (parsed.email) return parsed.email;
    } catch (e) {
      console.log("Could not parse attrs for email");
    }
  }
  return "N/A";
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
    console.log("Toggle initialized");
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
    console.log("Toggle clicked, now expanded:", !isExpanded);
  }
};
