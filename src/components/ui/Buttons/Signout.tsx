"use client";
import { useLogOut } from "@/hooks";
export default function SignoutBtn() {
  const closeSession = useLogOut();
  return (
    <button
      onClick={() => {
        closeSession();
      }}
      className="bg-black p-4 rounded-full w-[90%] text-md"
    >
      Cerrar Sesión
    </button>
  );
}
