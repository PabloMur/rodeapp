"use client";
import { useState } from "react";
import { CheckCircle, MapPin, Clock, Gauge, Plus } from "lucide-react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { lastCompletedTripAtom } from "@/atoms";
import CreateTripModal from "@/components/CreateTripModal";

function formatDuration(startedAt: string, endedAt?: string): string {
  const start = new Date(startedAt);
  const end = endedAt ? new Date(endedAt) : new Date();
  const totalHours = Math.floor((end.getTime() - start.getTime()) / 3600000);
  const days = Math.floor(totalHours / 24);
  const hours = totalHours % 24;
  if (days === 0) return `${hours}h en ruta`;
  if (hours === 0) return `${days} día${days > 1 ? "s" : ""} en ruta`;
  return `${days} día${days > 1 ? "s" : ""} y ${hours}h en ruta`;
}

export default function PostTripView() {
  const trip = useRecoilValue(lastCompletedTripAtom)!;
  const clearLastTrip = useSetRecoilState(lastCompletedTripAtom);
  const [modalOpen, setModalOpen] = useState(false);
  const duration = formatDuration(trip.startedAt, trip.endedAt);

  return (
    <div className="flex flex-col min-h-[88vh] w-full p-4 gap-5 bg-black items-center justify-center">
      <div className="flex flex-col items-center gap-3 text-center">
        <div className="h-20 w-20 rounded-full bg-green-950 border border-green-500/30 flex items-center justify-center">
          <CheckCircle size={40} className="text-green-400" />
        </div>
        <div>
          <h1 className="text-white text-3xl font-bold">¡Llegaste!</h1>
          <p className="text-zinc-500 text-sm mt-1">Viaje completado</p>
        </div>
      </div>

      <div className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex flex-col gap-3.5">
        <div className="flex items-center gap-2">
          <MapPin size={15} className="text-orange-500 shrink-0" />
          <span className="text-zinc-400 text-sm">
            {trip.origin}
            <span className="text-zinc-600 mx-1.5">→</span>
            <span className="text-white font-semibold">{trip.destination}</span>
          </span>
        </div>

        {trip.estimatedKm && (
          <div className="flex items-center gap-2">
            <Gauge size={15} className="text-orange-500 shrink-0" />
            <span className="text-zinc-400 text-sm">{trip.estimatedKm} km estimados</span>
          </div>
        )}

        <div className="flex items-center gap-2">
          <Clock size={15} className="text-orange-500 shrink-0" />
          <span className="text-zinc-400 text-sm">{duration}</span>
        </div>
      </div>

      <div className="w-full flex flex-col gap-2">
        <button
          onClick={() => {
            clearLastTrip(null);
            setModalOpen(true);
          }}
          className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400
            active:scale-95 transition-all text-black font-bold py-4 rounded-2xl text-base select-none"
        >
          <Plus size={20} />
          Nuevo viaje
        </button>
        <button
          onClick={() => clearLastTrip(null)}
          className="w-full py-3.5 text-zinc-600 hover:text-zinc-400 transition-colors text-sm"
        >
          Volver al inicio
        </button>
      </div>

      <CreateTripModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
