"use client";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function WelcomeCard() {
  const { data: session } = useSession();
  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4 w-full flex justify-between items-center">
      <div>
        <p className="text-zinc-400 text-sm">Bienvenido de vuelta</p>
        <h2 className="text-white font-bold text-lg">
          {session?.user?.name ?? "Motoviajero"}
        </h2>
      </div>
      {session?.user?.image && (
        <Image
          src={session.user.image}
          alt="avatar"
          height={44}
          width={44}
          className="rounded-full border-2 border-orange-500"
        />
      )}
    </div>
  );
}
