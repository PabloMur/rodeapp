import { Bike } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 border-t border-zinc-800 py-8 px-4">
      <div className="max-w-md mx-auto flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <Bike size={24} className="text-orange-500" />
          <span className="text-white font-bold text-lg">RodeApp</span>
        </div>
        <p className="text-zinc-500 text-sm text-center">
          Tu compañero para cada aventura sobre dos ruedas.
        </p>
        <p className="text-zinc-700 text-xs mt-2">
          © 2024 RodeApp. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
