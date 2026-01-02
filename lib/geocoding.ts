
export interface LocationInfo {
  name: string;
  description: string;
  country?: string;
  isOcean: boolean;
  isDesert: boolean;
  isMountain: boolean;
}

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<LocationInfo> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`,
      {
        headers: {
          'User-Agent': 'BirthdayPlaceApp/1.0',
        },
      }
    );

    if (!response.ok) {
      return getFallbackLocationInfo(latitude, longitude);
    }

    const data = await response.json();

    if (data && data.address) {
      const address = data.address;

      let name = "";
      if (address.city) {
        name = address.city;
        if (address.state || address.country) {
          name += `, ${address.state || address.country}`;
        }
      } else if (address.town) {
        name = address.town;
        if (address.state || address.country) {
          name += `, ${address.state || address.country}`;
        }
      } else if (address.village) {
        name = address.village;
        if (address.state || address.country) {
          name += `, ${address.state || address.country}`;
        }
      } else if (address.county) {
        name = address.county;
        if (address.country) {
          name += `, ${address.country}`;
        }
      } else if (address.state) {
        name = address.state;
        if (address.country) {
          name += `, ${address.country}`;
        }
      } else if (address.country) {
        name = address.country;
      } else {
        name = data.display_name || formatCoordinates(latitude, longitude);
      }

      const isOcean = isOceanLocation(latitude, longitude) ||
        (data.type === "water" || data.type === "ocean");

      return {
        name: name || formatCoordinates(latitude, longitude),
        description: generateDescription(name || formatCoordinates(latitude, longitude), latitude, longitude, isOcean),
        country: address.country,
        isOcean,
        isDesert: false,
        isMountain: false,
      };
    }

    return getFallbackLocationInfo(latitude, longitude);
  } catch (error) {
    console.error("Geocoding error:", error);
    return getFallbackLocationInfo(latitude, longitude);
  }
}

function formatCoordinates(lat: number, lon: number): string {
  const latDir = lat >= 0 ? "N" : "S";
  const lonDir = lon >= 0 ? "E" : "W";
  return `${Math.abs(lat).toFixed(2)}° ${latDir}, ${Math.abs(lon).toFixed(2)}° ${lonDir}`;
}

function getFallbackLocationInfo(latitude: number, longitude: number): LocationInfo {
  const coords = formatCoordinates(latitude, longitude);
  const isOcean = isOceanLocation(latitude, longitude);

  if (isOcean) {
    return {
      name: "The Open Ocean",
      description: `According to this system, your birthday exists at ${coords} — a place in the vast ocean, where waves meet the horizon and the sky reflects infinite blue.`,
      isOcean: true,
      isDesert: false,
      isMountain: false,
    };
  }

  return {
    name: coords,
    description: `According to this system, your birthday exists at ${coords} — a unique point on Earth where your date of birth finds its geographic expression.`,
    isOcean: false,
    isDesert: false,
    isMountain: false,
  };
}

function isOceanLocation(latitude: number, longitude: number): boolean {
  if (latitude > -60 && latitude < 60) {
    if (longitude > 100 && longitude < 260) return true;
    if (longitude < -70 && longitude > -180) return true;
  }

  if (latitude > -60 && latitude < 60) {
    if (longitude > -70 && longitude < 20) return true;
  }

  if (latitude > -60 && latitude < 30) {
    if (longitude > 20 && longitude < 100) return true;
  }

  if (latitude > 60) {
    if (longitude > -180 && longitude < 180) return true;
  }

  if (latitude < -60) {
    return true;
  }

  return false;
}

function generateDescription(name: string, latitude: number, longitude: number, isOcean: boolean): string {
  const coords = formatCoordinates(latitude, longitude);

  if (isOcean) {
    return `According to this system, your birthday exists at ${coords} — a place in the vast ocean, where waves meet the horizon and the sky reflects infinite blue.`;
  }

  const descriptions = [
    `According to this system, your birthday exists near ${name} — a place of unique character, where your date of birth finds its geographic expression.`,
    `According to this system, your birthday exists at ${coords}, near ${name} — a location that carries the mathematical essence of your birth date.`,
    `According to this system, your birthday exists near ${name} — a place where time and space converge to mark your special date.`,
  ];

  return descriptions[Math.abs(latitude + longitude) % descriptions.length];
}
