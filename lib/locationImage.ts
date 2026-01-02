
export async function getLocationImage(
  latitude: number,
  longitude: number,
  locationName: string
): Promise<string> {
  const searchQuery = locationName.split(',')[0].trim();
  const lowerName = locationName.toLowerCase();

  if (lowerName.includes("ocean") || lowerName.includes("sea")) {
    return "https://images.unsplash.com/photo-1439405326854-014607f694d7?q=80&w=2070&auto=format&fit=crop";
  }

  try {
    const wikiResponse = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(searchQuery)}`,
      {
        headers: {
          'User-Agent': 'co-date/1.0 (https://co-date.vercel.app)',
        },
      }
    );

    if (wikiResponse.ok) {
      const wikiData = await wikiResponse.json();
      if (wikiData.thumbnail && wikiData.thumbnail.source) {
        let imageUrl = wikiData.thumbnail.source;
        imageUrl = imageUrl.replace(/\/\d+px-/, '/800px-');

        return new Promise((resolve, reject) => {
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.onload = () => resolve(imageUrl);
          img.onerror = () => reject();
          img.src = imageUrl;
        });
      }
    }
  } catch (error) {
    console.log("Wikimedia failed");
  }

  if (lowerName.includes("water") || lowerName.includes("lake")) {
    return "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=2668&auto=format&fit=crop";
  }
  if (lowerName.includes("desert") || lowerName.includes("sand")) {
    return "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2670&auto=format&fit=crop";
  }

  return getMapImageUrl(latitude, longitude);
}

export function getMapImageUrl(latitude: number, longitude: number): string {
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${latitude},${longitude}&zoom=4&size=800x600&markers=${latitude},${longitude},red-pushpin`;
}
