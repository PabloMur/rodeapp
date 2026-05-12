"use client";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useRecoilState } from "recoil";
import { userLocation } from "@/atoms";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const DEFAULT_CENTER: [number, number] = [-58.3816, -34.6037];

function getPosition(): Promise<[number, number]> {
  return new Promise((resolve) => {
    if (!navigator?.geolocation) {
      resolve(DEFAULT_CENTER);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => resolve([coords.longitude, coords.latitude]),
      () => resolve(DEFAULT_CENTER),
      { timeout: 8000 }
    );
  });
}

export default function MapboxNavigation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [, setValue] = useRecoilState(userLocation);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    let map: mapboxgl.Map;

    getPosition().then((center) => {
      if (!containerRef.current) return;

      map = new mapboxgl.Map({
        container: containerRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center,
        zoom: 14,
        accessToken: TOKEN,
      });

      mapRef.current = map;

      map.once("load", () => setIsLoading(false));

      const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
        showUserHeading: true,
      });

      geolocate.on("geolocate", (e: any) => {
        setValue({ latitude: e.coords.latitude, longitude: e.coords.longitude });
      });

      map.addControl(geolocate);
      map.addControl(new mapboxgl.NavigationControl());
    });

    return () => {
      map?.remove();
      mapRef.current = null;
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div ref={containerRef} className="h-full w-full" />
      {isLoading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#1a1a2e] animate-pulse">
          <div className="h-full w-full bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] opacity-90" />
          <div className="absolute flex flex-col items-center gap-3">
            <div className="h-10 w-10 rounded-full border-4 border-white/20 border-t-white animate-spin" />
            <span className="text-sm text-white/50 tracking-wide">Cargando mapa…</span>
          </div>
        </div>
      )}
    </div>
  );
}
