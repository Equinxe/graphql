// Professional information management

// Professional field mappings
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

export function updateProfessionalInfo(userAttrs) {
  // Update professional fields using existing HTML IDs
  const professionalElements = {
    userCompany: document.getElementById("userCompany"),
    userPosition: document.getElementById("userPosition"),
    userSituation: document.getElementById("userSituation"),
  };

  // Update company
  if (professionalElements.userCompany) {
    const company =
      userAttrs.company ||
      userAttrs.employer ||
      userAttrs.workplace ||
      userAttrs.organization ||
      "N/A";
    professionalElements.userCompany.textContent = company;
  }

  // Update position
  if (professionalElements.userPosition) {
    const position =
      userAttrs.position ||
      userAttrs.job_title ||
      userAttrs.jobTitle ||
      userAttrs.title ||
      userAttrs.role ||
      userAttrs.occupation ||
      "N/A";
    professionalElements.userPosition.textContent = position;
  }

  // Update situation
  if (professionalElements.userSituation) {
    const situation =
      userAttrs.Situation ||
      userAttrs.situation ||
      userAttrs.status ||
      userAttrs.marital_status ||
      userAttrs.maritalStatus ||
      "N/A";
    professionalElements.userSituation.textContent = situation;
  }
}
