import dynamic from "next/dynamic";
import { Bike, Map, ClipboardList, CloudSun, Fuel } from "lucide-react";
import CtaBtn from "@/components/ui/Buttons/CtaBtn";
import css from "@/styles/home.module.css";

const BenefitsSlider = dynamic(() => import("@/components/BenefitsSlider"), { ssr: false });
const TestimonialCard = dynamic(() => import("@/components/cards/TestimonialCard"));

export default function Home() {
  return (
    <div className="bg-black">
      {/* Hero */}
      <section
        className={`${css.mainContainer} relative flex flex-col justify-center items-center min-h-[88vh] w-full`}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 flex flex-col items-center gap-4 px-6 text-center">
          <Bike size={72} className="text-orange-500" />
          <h1 className="text-4xl font-bold text-white leading-tight">
            Bienvenido a <span className="text-orange-500">RodeApp</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-sm">
            Organizá todo para tu viaje en un solo lugar.
          </p>
          <CtaBtn />
        </div>
      </section>

      {/* Qué es RodeApp */}
      <section className="min-h-[60vh] w-full flex flex-col justify-center items-center px-6 py-16 gap-6">
        <h2 className="text-3xl font-bold text-white text-center">
          ¿Qué es <span className="text-orange-500">RodeApp</span>?
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed max-w-prose text-center">
          Somos motoviajeros, exploradores de carreteras y amantes de la libertad sobre
          dos ruedas. Nuestra misión es facilitar la planificación de tus viajes en moto:
          rutas personalizadas, listas de verificación, clima en tiempo real, y mucho más.
          Todo en un solo lugar, para que cada kilómetro cuente.
        </p>
        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
          {[
            { icon: <Map size={28} />, label: "Rutas" },
            { icon: <ClipboardList size={28} />, label: "Listas" },
            { icon: <CloudSun size={28} />, label: "Clima" },
            { icon: <Fuel size={28} />, label: "Combustible" },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 flex flex-col items-center gap-2"
            >
              <div className="text-orange-500">{item.icon}</div>
              <span className="text-white font-semibold text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Beneficios */}
      <section className="w-full bg-zinc-950 border-y border-zinc-800 py-12">
        <h2 className="text-2xl font-bold text-white text-center mb-2 px-4">
          Todo lo que necesitás
        </h2>
        <p className="text-zinc-500 text-sm text-center mb-8 px-4">
          Herramientas pensadas para el motoviajero
        </p>
        <BenefitsSlider />
      </section>

      {/* Testimonios */}
      <section className="w-full py-16 px-2">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Lo que dicen los motoviajeros
        </h2>
        <div className="flex flex-col gap-0">
          <TestimonialCard
            name="Juan Hernandez"
            location="Buenos Aires, Argentina"
            rating={5}
            testimonial="¡Increíble experiencia! La aplicación hizo todo mucho más fácil y divertido. ¡Altamente recomendado!"
            date="2 de marzo de 2023"
            avatar="https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg?size=626&ext=jpg"
          />
          <TestimonialCard
            name="María López"
            location="Madrid, España"
            rating={4}
            testimonial="RodeApp hizo que mi viaje fuera mucho más organizado. Pude planificar todas mis paradas y conocer lugares increíbles."
            date="15 de abril de 2023"
            avatar="https://img.freepik.com/foto-gratis/retrato-hermoso-mujer-joven-posicion-pared-gris_231208-10760.jpg"
          />
          <TestimonialCard
            name="Carlos Ramirez"
            location="Ciudad de México, México"
            rating={5}
            testimonial="¡RodeApp superó mis expectativas! Me ayudó a encontrar rutas emocionantes y descubrir lugares únicos."
            date="7 de mayo de 2023"
            avatar="https://img.freepik.com/foto-gratis/chico-guapo-seguro-posando-contra-pared-blanca_176420-32936.jpg?size=626&ext=jpg"
          />
        </div>
      </section>
    </div>
  );
}
