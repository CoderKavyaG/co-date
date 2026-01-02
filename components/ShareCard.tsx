"use client";

import { Birthday, Coordinates } from "@/lib/coordinates";
import { LocationInfo } from "@/lib/geocoding";
import { formatCoordinates } from "@/lib/coordinates";

interface ShareCardProps {
  birthday: Birthday;
  coordinates: Coordinates;
  locationInfo: LocationInfo;
}

export default function ShareCard({ birthday, coordinates, locationInfo }: ShareCardProps) {
  const formattedDate = `${birthday.day}/${birthday.month}/${birthday.year}`;
  const formattedCoords = formatCoordinates(coordinates);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
      <div className="text-center space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            If Your Birthday Were a Place
          </h1>
          <p className="text-gray-600">Discover where your birthday exists on Earth</p>
        </div>

        {/* Birthday */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Birthday</p>
          <p className="text-2xl font-bold text-gray-900">{formattedDate}</p>
        </div>

        {/* Coordinates */}
        <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
          <p className="text-sm text-purple-600 mb-2 font-medium">Coordinates</p>
          <p className="text-3xl font-bold text-purple-900">{formattedCoords}</p>
        </div>

        {/* Location */}
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">Location</p>
          <p className="text-xl font-semibold text-gray-900 mb-2">{locationInfo.name}</p>
          <p className="text-gray-700 text-sm leading-relaxed">{locationInfo.description}</p>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Share your birthday place at birthdayplace.vercel.app
          </p>
        </div>
      </div>
    </div>
  );
}

