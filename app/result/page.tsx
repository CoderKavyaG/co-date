"use client";

export const dynamic = 'force-dynamic';

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import { parseBirthdayFromUrl, birthdayToCoordinates, createShareableUrl } from "@/lib/coordinates";
import { reverseGeocode, type LocationInfo } from "@/lib/geocoding";
import type { Birthday, Coordinates } from "@/lib/coordinates";
import ResultCard from "@/components/ResultCard";

function ResultPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [birthday, setBirthday] = useState<Birthday | null>(null);
  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
  const [locationInfo, setLocationInfo] = useState<LocationInfo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const parsed = parseBirthdayFromUrl(searchParams);

    if (!parsed) {
      router.push("/");
      return;
    }

    setBirthday(parsed);

    const coords = birthdayToCoordinates(parsed);
    setCoordinates(coords);

    reverseGeocode(coords.latitude, coords.longitude)
      .then((info) => {
        setLocationInfo(info);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error geocoding:", error);
        setLoading(false);
      });
  }, [searchParams, router]);

  if (loading || !birthday || !coordinates || !locationInfo) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your place...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow container mx-auto px-4 py-8 sm:py-20 flex flex-col items-center justify-center">
        <div className="max-w-4xl w-full">
          <button
            onClick={() => router.push("/")}
            className="mb-8 text-gray-500 hover:text-black transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </button>

          <ResultCard
            birthday={birthday}
            coordinates={coordinates}
            locationInfo={locationInfo}
          />
        </div>
      </div>

      <footer className="border-t border-gray-200 bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto flex flex-col items-center">

            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CD</span>
              </div>
              <span className="text-xl font-bold text-gray-900">co-date</span>
            </div>

            <div className="flex gap-8 mb-8">
              <a href="https://github.com/CoderKavyaG/co-date" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors font-medium">GitHub</a>
              <a href="https://x.com/goelsahhab" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-black transition-colors font-medium">Twitter / X</a>
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm font-medium">
                2025 | Developed by <a href="https://x.com/goelsahhab" target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline">@goelsahhab</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </main>
    }>
      <ResultPageContent />
    </Suspense>
  );
}
