"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { Plus, Compass, ChevronRight } from "lucide-react";
import Image from "next/image";
import WeatherGadget from "@/components/WeatherGadget";
import CreateTripModal from "@/components/CreateTripModal";
import { useRecoilValue } from "recoil";
import { lastCompletedTripAtom } from "@/atoms";

function timeGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

export default function NoTripView() {
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useState(false);
  const lastTrip = useRecoilValue(lastCompletedTripAtom);
  const name = session?.user?.name?.split(" ")[0] ?? "Motoviajero";

  return (
    <div className="flex flex-col min-h-[88vh] w-full p-4 gap-4 bg-black">
      <div className="flex items-center justify-between pt-1">
        <div>
          <p className="text-zinc-500 text-sm">{timeGreeting()}</p>
          <h1 className="text-white text-2xl font-bold">{name}</h1>
        </div>
        {session?.user?.image && (
          <Image
            src={session.user.image}
            alt="avatar"
            height={44}
            width={44}
            className="rounded-full border-2 border-zinc-700"
          />
        )}
      </div>

      <WeatherGadget />

      <div className="flex-1 flex flex-col items-center justify-center gap-5 py-8">
        <div className="h-20 w-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
          <Compass size={36} className="text-zinc-600" />
        </div>
        <div className="text-center flex flex-col gap-1.5">
          <p className="text-white font-semibold text-lg">Sin kilómetros pendientes.</p>
          <p className="text-zinc-500 text-sm">Pero hay rutas esperando.</p>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 bg-orange-500 hover:bg-orange-400
            active:scale-95 transition-all text-black font-bold py-4 px-8 rounded-2xl text-base select-none"
        >
          <Plus size={20} />
          Planear un viaje
        </button>
      </div>

      {lastTrip && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-zinc-500 text-xs uppercase tracking-wider">Último viaje</p>
            <p className="text-white font-semibold text-sm">
              {lastTrip.origin} → {lastTrip.destination}
            </p>
            {lastTrip.estimatedKm && (
              <p className="text-zinc-600 text-xs">{lastTrip.estimatedKm} km</p>
            )}
          </div>
          <ChevronRight size={16} className="text-zinc-600 shrink-0" />
        </div>
      )}

      <CreateTripModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
