"use client";

import { useEffect } from "react";
import { useMap } from "react-leaflet";

interface MapViewUpdaterProps {
  latitude: number;
  longitude: number;
}

export default function MapViewUpdater({ latitude, longitude }: MapViewUpdaterProps) {
  const map = useMap();
  
  useEffect(() => {
    map.setView([latitude, longitude], map.getZoom());
  }, [latitude, longitude, map]);
  
  return null;
}

