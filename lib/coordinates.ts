/**
 * Mathematical mapping from birthday to geographic coordinates
 */

export interface Birthday {
  day: number;
  month: number;
  year: number;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Converts a birthday to geographic coordinates using deterministic mathematical mapping
 */
export function birthdayToCoordinates(birthday: Birthday): Coordinates {
  const { day, month, year } = birthday;

  // Day → Latitude
  // latitude = (day / 31) * 180 - 90
  let latitude = (day / 31) * 180 - 90;

  // Month → Longitude
  // longitude = (month / 12) * 360 - 180
  let longitude = (month / 12) * 360 - 180;

  // Year Offset (Subtle Variation)
  // Add a small year-based offset to avoid collisions
  const yearOffset = (year % 100) / 100;
  latitude += yearOffset;
  longitude += yearOffset * 2;

  // Clamp values to valid ranges
  latitude = Math.max(-90, Math.min(90, latitude));
  longitude = Math.max(-180, Math.min(180, longitude));

  return {
    latitude: parseFloat(latitude.toFixed(6)),
    longitude: parseFloat(longitude.toFixed(6)),
  };
}

/**
 * Formats coordinates for display
 */
export function formatCoordinates(coords: Coordinates): string {
  const latDir = coords.latitude >= 0 ? "N" : "S";
  const lonDir = coords.longitude >= 0 ? "E" : "W";
  const lat = Math.abs(coords.latitude).toFixed(2);
  const lon = Math.abs(coords.longitude).toFixed(2);
  return `${lat}° ${latDir}, ${lon}° ${lonDir}`;
}

/**
 * Creates a shareable URL for a birthday
 */
export function createShareableUrl(birthday: Birthday): string {
  const params = new URLSearchParams({
    d: birthday.day.toString(),
    m: birthday.month.toString(),
    y: birthday.year.toString(),
  });
  return `/result?${params.toString()}`;
}

/**
 * Parses birthday from URL parameters
 */
export function parseBirthdayFromUrl(params: URLSearchParams | any): Birthday | null {
  const day = parseInt(params.get("d") || "");
  const month = parseInt(params.get("m") || "");
  const year = parseInt(params.get("y") || "");

  // Basic validation
  if (!day || !month || !year || day < 1 || month < 1 || month > 12 || year < 1 || year > 9999) {
    return null;
  }

  // Days per month validation
  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // Check for leap year
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  if (isLeapYear) {
    daysInMonth[1] = 29;
  }

  if (day > daysInMonth[month - 1]) {
    return null;
  }

  return { day, month, year };
}

