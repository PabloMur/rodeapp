"use client";
import { useRef, useState } from "react";
import {
  Map, ClipboardList, CloudSun, Fuel, Navigation, Bike, FileText,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import BenefitCard from "@/components/cards/BenefitsCard";

const BENEFITS = [
  {
    icon: <Map size={24} />,
    title: "Planificación Intuitiva",
    description: "Trazá rutas personalizadas y descubrí destinos emocionantes fácilmente.",
  },
  {
    icon: <ClipboardList size={24} />,
    title: "Listas de Verificación",
    description: "Creá y gestioná listas de ítems esenciales para tu viaje.",
  },
  {
    icon: <CloudSun size={24} />,
    title: "Clima en Tiempo Real",
    description: "Mantente informado sobre las condiciones climáticas en tu ruta.",
  },
  {
    icon: <Fuel size={24} />,
    title: "Calculadora de Combustible",
    description: "Estimaciones precisas de consumo según tu moto y ruta.",
  },
  {
    icon: <Navigation size={24} />,
    title: "Navegación GPS",
    description: "Seguimiento en tiempo real para nunca perderte.",
  },
  {
    icon: <Bike size={24} />,
    title: "Gestión de Motos",
    description: "Registrá tu garage y usá los datos en la calculadora.",
  },
  {
    icon: <FileText size={24} />,
    title: "Notas de Viaje",
    description: "Anotá ideas, recordatorios y comentarios de cada ruta.",
  },
];

const CARD_WIDTH = 240 + 16; // min-w-[240px] + gap-4

export default function BenefitsSlider() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const scrollTo = (index: number) => {
    const el = scrollRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(BENEFITS.length - 1, index));
    el.scrollTo({ left: clamped * CARD_WIDTH, behavior: "smooth" });
    setCurrent(clamped);
  };

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCurrent(Math.round(el.scrollLeft / CARD_WIDTH));
  };

  return (
    <div className="relative overflow-hidden">
      {/* Cards */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4"
        style={{ scrollbarWidth: "none" }}
      >
        {BENEFITS.map((b) => (
          <BenefitCard key={b.title} icon={b.icon} title={b.title} description={b.description} />
        ))}
        <div className="shrink-0 w-4" />
      </div>

      {/* Arrows */}
      <button
        onClick={() => scrollTo(current - 1)}
        disabled={current === 0}
        className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2
          w-9 h-9 items-center justify-center rounded-full
          bg-zinc-800 border border-zinc-700 text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          hover:bg-zinc-700 transition-colors shadow-lg"
      >
        <ChevronLeft size={18} />
      </button>
      <button
        onClick={() => scrollTo(current + 1)}
        disabled={current === BENEFITS.length - 1}
        className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2
          w-9 h-9 items-center justify-center rounded-full
          bg-zinc-800 border border-zinc-700 text-white
          disabled:opacity-30 disabled:cursor-not-allowed
          hover:bg-zinc-700 transition-colors shadow-lg"
      >
        <ChevronRight size={18} />
      </button>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {BENEFITS.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`rounded-full transition-all duration-200
              ${i === current ? "w-5 h-2 bg-orange-500" : "w-2 h-2 bg-zinc-600 hover:bg-zinc-500"}`}
          />
        ))}
      </div>
    </div>
  );
}
