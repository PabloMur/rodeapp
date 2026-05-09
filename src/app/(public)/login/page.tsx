"use client";
import { Bike } from "lucide-react";
import { useSignin } from "@/hooks";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Login() {
  const signInGoogle = useSignin();
  const [loadingDemo, setLoadingDemo] = useState(false);

  async function handleDemo() {
    setLoadingDemo(true);
    await signIn("demo", { callbackUrl: "/home" });
  }

  return (
    <div className="min-h-[88vh] bg-black flex flex-col justify-center items-center gap-6 p-4">
      <div className="flex flex-col items-center gap-3 mb-2">
        <Bike size={80} className="text-orange-500" />
        <h1 className="text-4xl font-bold text-white tracking-tight">RodeApp</h1>
        <p className="text-zinc-400 text-center text-sm max-w-xs">
          Tu compañero para cada aventura sobre dos ruedas
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-8 w-full max-w-sm flex flex-col items-center gap-4">
        <h2 className="text-white font-bold text-xl">Ingresar</h2>

        <button
          className="w-full flex items-center justify-center gap-3 bg-white text-zinc-900
            font-semibold py-3 px-6 rounded-xl hover:bg-zinc-100 active:scale-95
            transition-all shadow-lg"
          onClick={signInGoogle}
        >
          <Image src="/google.svg" alt="Google" width={22} height={22} />
          Continuar con Google
        </button>

        <div className="flex items-center gap-3 w-full">
          <div className="flex-1 h-px bg-zinc-700" />
          <span className="text-zinc-600 text-xs">o</span>
          <div className="flex-1 h-px bg-zinc-700" />
        </div>

        <button
          onClick={handleDemo}
          disabled={loadingDemo}
          className="w-full flex items-center justify-center gap-2 border border-orange-500/50
            text-orange-400 font-semibold py-3 px-6 rounded-xl hover:bg-orange-500/10
            active:scale-95 transition-all disabled:opacity-60"
        >
          <Bike size={18} />
          {loadingDemo ? "Cargando..." : "Explorar como invitado"}
        </button>

        <p className="text-zinc-600 text-xs text-center">
          Al continuar aceptás los términos de uso de RodeApp.
        </p>
      </div>
    </div>
  );
}
