"use client";
import { Bike } from "lucide-react";
import { useSignin } from "@/hooks";
import Image from "next/image";
import google from "../../../public/google.svg";

export default function Login() {
  const signIn = useSignin();
  return (
    <div className="min-h-[88vh] bg-black flex flex-col justify-center items-center gap-6 p-4">
      <div className="flex flex-col items-center gap-3 mb-2">
        <Bike size={80} className="text-orange-500" />
        <h1 className="text-4xl font-bold text-white tracking-tight">RodeApp</h1>
        <p className="text-zinc-400 text-center text-sm max-w-xs">
          Tu compañero para cada aventura sobre dos ruedas
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-5">
        <h2 className="text-white font-bold text-xl">Ingresar</h2>
        <button
          className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900
            font-semibold py-3 px-6 rounded-xl hover:bg-zinc-100 active:scale-95
            transition-all shadow-lg"
          onClick={signIn}
        >
          <Image src={google} alt="Google" width={22} height={22} />
          Continuar con Google
        </button>
        <p className="text-zinc-600 text-xs text-center">
          Al continuar aceptás los términos de uso de RodeApp.
        </p>
      </div>
    </div>
  );
}
