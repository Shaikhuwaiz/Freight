// getCoords.ts
import { countryCoords } from "./countryCoords";
import { nameToCode } from "./nameToCode";

export function getCoords(rawLocation: string | undefined): [number, number] | null {
  if (!rawLocation) return null;

  let location = rawLocation.trim().toLowerCase();

  // 1. FIRST TRY: city → country code
  if (nameToCode[location]) {
    const countryCode = nameToCode[location];
    if (countryCoords[countryCode]) {
      return countryCoords[countryCode];
    }
  }

  // 2. SECOND TRY: direct country name → country code
  const formatted = location.charAt(0).toUpperCase() + location.slice(1);
  if (nameToCode[formatted]) {
    const countryCode = nameToCode[formatted];
    if (countryCoords[countryCode]) {
      return countryCoords[countryCode];
    }
  }

  // 3. THIRD TRY: country code directly (like "IN" / "CN")
  const upper = rawLocation.trim().toUpperCase();
  if (countryCoords[upper]) {
    return countryCoords[upper];
  }

  console.warn("Coordinates not found for:", rawLocation);
  return null;
}
