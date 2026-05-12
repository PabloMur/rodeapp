"use client";
import { useEffect, useState } from "react";
import { ArrowRight, Bike, Square, Fuel, MapPin, DollarSign, Camera, Clock, Flag } from "lucide-react";
import type { TripData } from "@/types";
import WeatherGadget from "@/components/WeatherGadget";
import { useEndTrip } from "@/hooks";

interface Props {
  trip: TripData;
}

function formatElapsed(startedAt: string): string {
  const diffMs = Date.now() - new Date(startedAt).getTime();
  const totalMins = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMins / 60);
  const mins = totalMins % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

function formatStartDate(startedAt: string): string {
  return new Date(startedAt).toLocaleString("es-AR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

const QUICK_ACTIONS = [
  { icon: <Fuel size={22} />, label: "Nafta" },
  { icon: <MapPin size={22} />, label: "Check" },
  { icon: <DollarSign size={22} />, label: "Gasto" },
  { icon: <Camera size={22} />, label: "Foto" },
];

export default function ActiveTripView({ trip }: Props) {
  const endTrip = useEndTrip();
  const [elapsed, setElapsed] = useState(() => formatElapsed(trip.startedAt));
  const [activeHint, setActiveHint] = useState<string | null>(null);

  useEffect(() => {
    const id = setInterval(() => setElapsed(formatElapsed(trip.startedAt)), 60000);
    return () => clearInterval(id);
  }, [trip.startedAt]);

  function handleQuickAction(label: string) {
    setActiveHint(label);
    setTimeout(() => setActiveHint(null), 2000);
  }

  return (
    <div className="flex flex-col min-h-[88vh] w-full p-4 gap-3 bg-black">
      <div className="flex items-center gap-2 pt-1">
        <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
        <span className="text-green-400 text-xs font-bold uppercase tracking-widest">En ruta</span>
      </div>

      <div className="bg-zinc-900 border border-orange-500/30 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-white font-bold text-lg leading-tight">{trip.origin}</span>
          <ArrowRight size={18} className="text-orange-500 shrink-0" />
          <span className="text-white font-bold text-lg leading-tight">{trip.destination}</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-500 text-sm">
          <Bike size={14} />
          <span>{trip.bikeName}</span>
        </div>
        {trip.estimatedKm && (
          <div className="flex flex-col gap-1.5 pt-1 border-t border-zinc-800">
            <div className="flex justify-between text-xs text-zinc-600">
              <span>Distancia estimada</span>
              <span>{trip.estimatedKm} km</span>
            </div>
            <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full w-0 bg-orange-500 rounded-full" />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Clock size={12} />
            <span className="uppercase tracking-wider">Tiempo en ruta</span>
          </div>
          <p className="text-white font-bold text-2xl">{elapsed}</p>
        </div>
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-zinc-500 text-xs">
            <Flag size={12} />
            <span className="uppercase tracking-wider">Salida</span>
          </div>
          <p className="text-zinc-300 text-sm font-semibold leading-snug">
            {formatStartDate(trip.startedAt)}
          </p>
        </div>
      </div>

      <WeatherGadget />

      <div className="flex flex-col gap-2">
        <p className="text-zinc-600 text-xs uppercase tracking-wider">Acciones rápidas</p>
        <div className="grid grid-cols-4 gap-2">
          {QUICK_ACTIONS.map(({ icon, label }) => (
            <button
              key={label}
              onClick={() => handleQuickAction(label)}
              className="flex flex-col items-center justify-center gap-1.5 bg-zinc-900 hover:bg-zinc-800
                border border-zinc-800 rounded-2xl py-4 transition-all active:scale-95"
            >
              <span className="text-orange-500">{icon}</span>
              <span className="text-zinc-400 text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
        {activeHint && (
          <p className="text-center text-zinc-600 text-xs animate-pulse">
            {activeHint} — próximamente
          </p>
        )}
      </div>

      <button
        onClick={endTrip}
        className="w-full flex items-center justify-center gap-2 border border-zinc-800
          hover:border-zinc-600 text-zinc-500 hover:text-zinc-300 transition-all
          py-3.5 rounded-2xl text-sm font-semibold mt-auto"
      >
        <Square size={13} />
        Terminar viaje
      </button>
    </div>
  );
}
