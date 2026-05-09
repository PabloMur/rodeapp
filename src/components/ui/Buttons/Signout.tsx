"use client";
import { useLogOut } from "@/hooks";

export default function SignoutBtn() {
  const closeSession = useLogOut();
  return (
    <button
      onClick={closeSession}
      className="w-full mt-2 bg-black/20 text-black font-semibold py-3 px-4 rounded-xl hover:bg-black/30 transition-colors text-base"
    >
      Cerrar sesión
    </button>
  );
}
