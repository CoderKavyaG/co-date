"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// Dynamically import all Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);

const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);

const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

const MapViewUpdater = dynamic(
  () => import("./MapViewUpdater"),
  { ssr: false }
);

interface MapDisplayProps {
  latitude: number;
  longitude: number;
  className?: string;
}

export default function MapDisplay({ latitude, longitude, className = "" }: MapDisplayProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [redIcon, setRedIcon] = useState<any>(null);
  const cssLoaded = useRef(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Load Leaflet CSS
    if (typeof window !== "undefined" && !cssLoaded.current) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      link.integrity = "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
      link.crossOrigin = "";
      document.head.appendChild(link);
      cssLoaded.current = true;
    }
    
    // Import and configure Leaflet on the client
    if (typeof window !== "undefined") {
      import("leaflet").then((L) => {
        // Fix for default marker icon in Next.js
        if ((L.default.Icon.Default.prototype as any)._getIconUrl) {
          delete (L.default.Icon.Default.prototype as any)._getIconUrl;
        }
        L.default.Icon.Default.mergeOptions({
          iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
          iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
          shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
        });

        // Create custom red marker icon
        const icon = L.default.icon({
          iconUrl: "data:image/svg+xml;base64," + btoa(`
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="48" viewBox="0 0 32 48">
              <path fill="#ff6b6b" stroke="#fff" stroke-width="2" d="M16 0C7.2 0 0 7.2 0 16c0 11.2 16 32 16 32S32 27.2 32 16C32 7.2 24.8 0 16 0z"/>
              <circle cx="16" cy="16" r="8" fill="#fff"/>
            </svg>
          `),
          iconSize: [32, 48],
          iconAnchor: [16, 48],
          popupAnchor: [0, -48],
        });
        
        setRedIcon(icon);
      });
    }
  }, []);

  if (!isMounted || !redIcon) {
    return (
      <div className={`bg-gray-50 rounded-xl flex items-center justify-center border border-gray-200 ${className}`} style={{ minHeight: "400px" }}>
        <div className="text-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-gray-300 border-t-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative rounded-xl overflow-hidden border border-gray-200 shadow-sm ${className}`} style={{ minHeight: "400px" }}>
      <MapContainer
        center={[latitude, longitude]}
        zoom={10}
        style={{ height: "100%", width: "100%", zIndex: 0 }}
        scrollWheelZoom={true}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[latitude, longitude]} icon={redIcon}>
          <Popup>
            <div className="text-center">
              <strong>Your Birthday Place</strong><br />
              <span className="text-sm text-gray-600">{latitude.toFixed(4)}, {longitude.toFixed(4)}</span>
            </div>
          </Popup>
        </Marker>
        <MapViewUpdater latitude={latitude} longitude={longitude} />
      </MapContainer>
    </div>
  );
}
