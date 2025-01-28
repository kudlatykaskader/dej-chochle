// apiService.js
const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/reverse";

/**
 * Get country and city from latitude/longitude using one API call.
 * Zoom ~10 typically includes both city (or similar) and country info.
 *
 * Returns an object: { country, city }
 */
export async function getLocationInfo(lat, lon) {
  const url = `${NOMINATIM_BASE_URL}?lat=${lat}&lon=${lon}&zoom=10&format=jsonv2`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch location data");
  }

  const data = await response.json();

  // Extract the country and city from 'data.address'
  const { address = {} } = data;
  const country = address.country || "Unknown Country";

  // For the "city" part, fallback to other keys if city is missing
  const city =
    address.city ||
    address.town ||
    address.village ||
    address.municipality ||
    data.name ||
    "Unknown City";

  return { country, city };
}
