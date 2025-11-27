// utils/locationCoords.ts

export const countryCoords: Record<string, [number, number]> = {
  DE: [51.1657, 10.4515],
  GB: [51.5072, -0.1276],
  IN: [20.5937, 78.9629],
  CA: [56.1304, -106.3468],
  US: [37.0902, -95.7129],
  AE: [25.276987, 55.296249],
  CN: [35.8617, 104.1954],
  AU: [-25.2744, 133.7751],
  JP: [35.6762, 139.6503],
  BR: [-22.9068, -43.1729],
OM: [21.4735, 55.9754],
SY: [34.8021, 38.9968],

  // Cities
  Mumbai: [19.0760, 72.8777],
  Pune: [18.5204, 73.8567],
  Delhi: [28.7041, 77.1025],
  Chennai: [13.0827, 80.2707],
  Hyderabad: [17.3850, 78.4867],
  Bangalore: [12.9716, 77.5946],
  Toronto: [43.65107, -79.347015],
  Vancouver: [49.2827, -123.1207],
  Paris: [48.8566, 2.3522],
  Berlin: [52.5200, 13.4050]
};

// name → code or city mapping
export const nameToCode: Record<string, string> = {
  germany: "DE",
  berlin: "Berlin",
  syria: "SY",
  oman: "OM",

  // normalize city/country inputs
  damascus: "SY",
  muscat: "OM",

  // optional uppercase/TitleCase support
  Syria: "SY",
  Oman: "OM",
  london: "GB",
  england: "GB",
  uk: "GB",

  india: "IN",
  mumbai: "Mumbai",
  pune: "Pune",
  chennai: "India",
  hyderabad: "India",
  bangalore: "India",

  canada: "CA",
  toronto: "Toronto",
  vancouver: "Vancouver",

  usa: "US",
  unitedstates: "US",

  dubai: "AE",

 china: "CN",
  beijing: "CN",
  shanghai: "CN",
 China: "CN",
  rome: "IT",
  Italy: "IT",
  australia: "AU",
  sydney: "AU",

  japan: "JP",
  tokyo: "JP"
};

// FINAL FUNCTION — EXPORT THIS!
export function getCoords(location: string): [number, number] | null {
  if (!location) return null;

  const key = location.toLowerCase().replace(/\s+/g, "");

  // convert name → code or city name
  const lookup = nameToCode[key];

  if (!lookup) {
    console.warn("No location mapping for:", location);
    return null;
  }

  // if lookup is city name
  if (countryCoords[lookup]) {
    return countryCoords[lookup];
  }

  // else lookup is a country code
  if (countryCoords[lookup]) {
    return countryCoords[lookup];
  }

  console.warn("Coordinates not found for:", lookup);
  return null;
}
export const locationCoords = countryCoords;
