// Address information management

// Address field mappings
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
  "zipCode",
  "zip_code",
  "postalCode",
  "addressCountry",
  "address_country",
  "country",
];

export function updateAddressInfo(userAttrs) {
  // Get address container
  const addressContainer = document.getElementById("userAddress");
  if (!addressContainer) {
    return;
  }

  let street = "";
  let city = "";
  let postalCode = "";
  let country = "";

  // Parse full address or use individual fields
  const fullAddress = userAttrs.address || userAttrs.Address;
  if (fullAddress && typeof fullAddress === "string") {
    // Parse full address format
    const parts = fullAddress.split(",").map((part) => part.trim());
    if (parts.length >= 3) {
      street = parts[0];

      // Extract postal code and city
      const cityPart = parts[1];
      const cityMatch = cityPart.match(/^(\d+)\s+(.+)$/);
      if (cityMatch) {
        postalCode = cityMatch[1];
        city = cityMatch[2];
      } else {
        city = cityPart;
      }

      country = parts[2];
    }
  } else {
    // Use individual address fields
    street =
      userAttrs.addressStreet ||
      userAttrs.address_street ||
      userAttrs.street ||
      userAttrs.address ||
      "";
    city =
      userAttrs.addressCity || userAttrs.address_city || userAttrs.city || "";
    postalCode =
      userAttrs.addressPostalCode ||
      userAttrs.address_postal_code ||
      userAttrs.postal_code ||
      userAttrs.zipCode ||
      userAttrs.zip_code ||
      userAttrs.postalCode ||
      "";
    country =
      userAttrs.addressCountry ||
      userAttrs.address_country ||
      userAttrs.country ||
      "";
  }

  // Format address parts
  const addressParts = [];

  if (street) {
    addressParts.push(street);
  }

  if (postalCode && city) {
    addressParts.push(`${postalCode} ${city}`);
  } else if (city) {
    addressParts.push(city);
  } else if (postalCode) {
    addressParts.push(postalCode);
  }

  if (country) {
    addressParts.push(country);
  }

  // Display formatted address
  if (addressParts.length > 0) {
    addressContainer.innerHTML = `<div class="formatted-address">${addressParts.join(
      ", "
    )}</div>`;
  } else {
    addressContainer.innerHTML = `<div class="formatted-address">N/A</div>`;
  }
}
