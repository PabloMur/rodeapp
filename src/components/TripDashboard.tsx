"use client";
import { ArrowRight, Bike, Fuel, Gauge, OctagonAlert, Square } from "lucide-react";
import { Map, ClipboardList, FolderOpen, FileText } from "lucide-react";
import type { TripData } from "@/types";
import WeatherGadget from "@/components/WeatherGadget";
import HomeCard from "@/components/cards/HomeCard";
import { Button } from "@/components/ui";
import { useEndTrip } from "@/hooks";

interface TripDashboardProps {
  trip: TripData;
}

export default function TripDashboard({ trip }: TripDashboardProps) {
  const endTrip = useEndTrip();

  const hasStats = trip.estimatedKm && trip.estimatedKm > 0;

  return (
    <div className="flex flex-col min-h-[88vh] w-full p-4 gap-3 bg-black">
      {/* Trip banner */}
      <div className="bg-zinc-900 border border-orange-500/40 rounded-2xl p-4 flex flex-col gap-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex flex-col gap-1 min-w-0">
            <span className="text-xs text-orange-400 font-semibold uppercase tracking-wider">
              Viaje activo
            </span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-white font-bold text-base truncate">{trip.origin}</span>
              <ArrowRight size={16} className="text-orange-500 shrink-0" />
              <span className="text-white font-bold text-base truncate">{trip.destination}</span>
            </div>
            <div className="flex items-center gap-1 text-zinc-400 text-sm">
              <Bike size={14} />
              <span>{trip.bikeName}</span>
            </div>
          </div>
          <Button
            variant="danger"
            size="sm"
            className="shrink-0 flex items-center gap-1"
            onClick={endTrip}
          >
            <Square size={12} />
            Terminar
          </Button>
        </div>

        {hasStats && <TripStats trip={trip} />}
      </div>

      <WeatherGadget />

      <div className="grid grid-cols-2 gap-3">
        <HomeCard route="/navigation" icon={<Map size={30} />} label="Navegar" />
        <HomeCard route="/lists" icon={<ClipboardList size={30} />} label="Crear lista" variant="filled" />
        <HomeCard route="/my-lists" icon={<FolderOpen size={30} />} label="Mis Listas" />
        <HomeCard route="/my-bikes" icon={<Bike size={30} />} label="Mis Motos" />
        <HomeCard route="/calculator" icon={<Fuel size={30} />} label="Calculadora" />
        <HomeCard route="/messagges" icon={<FileText size={30} />} label="Notas" />
      </div>
    </div>
  );
}

function TripStats({ trip }: { trip: TripData }) {
  const km = trip.estimatedKm!;

  return (
    <div className="flex gap-3 pt-1 border-t border-zinc-800">
      <Stat icon={<Gauge size={14} />} label="Distancia" value={`${km} km`} />
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5 text-sm">
      <span className="text-orange-500">{icon}</span>
      <span className="text-zinc-400">{label}:</span>
      <span className="text-white font-semibold">{value}</span>
    </div>
  );
}
