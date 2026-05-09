"use client";
import { useState } from "react";
import { Map, ClipboardList, FolderOpen, Bike, Fuel, FileText, Plus } from "lucide-react";
import WeatherGadget from "@/components/WeatherGadget";
import WelcomeCard from "@/components/cards/WelcomeCard";
import HomeCard from "@/components/cards/HomeCard";
import TripDashboard from "@/components/TripDashboard";
import CreateTripModal from "@/components/CreateTripModal";
import { useActiveTrip } from "@/hooks";

export default function MainPanel() {
  const { activeTrip, loading } = useActiveTrip();
  const [modalOpen, setModalOpen] = useState(false);

  if (loading) {
    return (
      <div className="flex flex-col min-h-[88vh] w-full p-4 gap-3 bg-black">
        <div className="h-24 bg-zinc-900 rounded-2xl animate-pulse" />
        <div className="h-20 bg-zinc-900 rounded-2xl animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-28 bg-zinc-900 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (activeTrip) {
    return <TripDashboard trip={activeTrip} />;
  }

  return (
    <div className="flex flex-col min-h-[88vh] w-full p-4 gap-3 bg-black">
      <WelcomeCard />
      <WeatherGadget />

      <button
        onClick={() => setModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400
          active:scale-95 transition-all text-black font-bold py-4 rounded-2xl text-base select-none"
      >
        <Plus size={20} />
        Iniciar viaje
      </button>

      <div className="grid grid-cols-2 gap-3">
        <HomeCard route="/navigation" icon={<Map size={30} />} label="Navegar" />
        <HomeCard route="/lists" icon={<ClipboardList size={30} />} label="Crear lista" variant="filled" />
        <HomeCard route="/my-lists" icon={<FolderOpen size={30} />} label="Mis Listas" />
        <HomeCard route="/my-bikes" icon={<Bike size={30} />} label="Mis Motos" />
        <HomeCard route="/calculator" icon={<Fuel size={30} />} label="Calculadora" />
        <HomeCard route="/messagges" icon={<FileText size={30} />} label="Notas" />
      </div>

      <CreateTripModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
