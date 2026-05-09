"use client";
import { CloudRain } from "lucide-react";
import { useGeolocation } from "@/hooks";
import Image from "next/image";

export default function WeatherGadget() {
  const { weatherData, error } = useGeolocation();

  if (error) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 w-full flex items-center gap-3 h-20">
        <CloudRain size={24} className="text-zinc-400 shrink-0" />
        <p className="text-zinc-400 text-sm">No se pudo obtener el clima</p>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 w-full flex items-center gap-4 h-20 animate-pulse">
        <div className="h-10 w-10 rounded-full bg-zinc-700 shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-zinc-700 rounded w-1/3" />
          <div className="h-3 bg-zinc-700 rounded w-1/2" />
        </div>
        <div className="h-6 w-16 bg-zinc-700 rounded" />
      </div>
    );
  }

  const { current, location } = weatherData as any;

  if (!current) {
    return (
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 w-full flex items-center gap-3 h-20">
        <CloudRain size={24} className="text-zinc-400 shrink-0" />
        <p className="text-zinc-400 text-sm">No se pudo obtener el clima</p>
      </div>
    );
  }

  const { temp_c, condition: { text: description, icon } } = current;

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 w-full flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Image src={`https:${icon}`} alt="clima" height={48} width={48} />
        <div>
          <p className="text-white font-semibold text-sm">{description}</p>
          <p className="text-zinc-500 text-xs">
            {location.name}, {location.region}
          </p>
        </div>
      </div>
      <p className="text-orange-500 text-3xl font-bold">{temp_c}°</p>
    </div>
  );
}
