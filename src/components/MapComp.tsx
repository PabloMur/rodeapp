"use client";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useRecoilState } from "recoil";
import { userLocation } from "@/atoms";

const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";
const DEFAULT_CENTER: [number, number] = [-58.3816, -34.6037]; // Buenos Aires

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

  return <div ref={containerRef} className="h-full w-full" />;
}
