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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const parsed = parseBirthdayFromUrl(searchParams);

    if (!parsed) {
      setError("Invalid date provided. Please ensure the day, month, and year are correct and reasonable.");
      setLoading(false);
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
      .catch((err) => {
        console.error("Error geocoding:", err);
        setLoading(false);
      });
  }, [searchParams]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Calculating your place...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border-2 border-red-100 rounded-3xl p-8 sm:p-12 shadow-xl max-w-lg w-full text-center">
          <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
          <p className="text-gray-600 mb-8">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-4 bg-black text-white font-medium rounded-xl hover:bg-gray-900 transition-all hover:shadow-lg"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  if (!birthday || !coordinates || !locationInfo) return null;

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
