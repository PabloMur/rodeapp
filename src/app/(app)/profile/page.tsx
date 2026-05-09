"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { ClipboardList, Bike, FileText } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { StatCard, Card, PageHeader } from "@/components/ui";

export default function Profile() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({ lists: 0, bikes: 0, notes: 0 });

  const email = session?.user?.email || "";

  useEffect(() => {
    if (!email) return;
    Promise.all([
      axios.get(`/api/list?email=${email}`),
      axios.get(`/api/bike?email=${email}`),
      axios.get(`/api/note?email=${email}`),
    ])
      .then(([lists, bikes, notes]) => {
        setStats({
          lists: lists.data.lists?.length ?? 0,
          bikes: bikes.data.bikes?.length ?? 0,
          notes: notes.data.notes?.length ?? 0,
        });
      })
      .catch(() => {});
  }, [email]);

  if (!session) {
    return (
      <div className="min-h-[88vh] bg-black flex items-center justify-center">
        <p className="text-zinc-400">Iniciá sesión para ver tu perfil.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[88vh] bg-black p-4 flex flex-col gap-6">
      <PageHeader title="Perfil" subtitle="Tu información de motoviajero" />

      <Card variant="bordered" className="flex flex-col items-center gap-3 py-6">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt="avatar"
            width={80}
            height={80}
            className="rounded-full border-2 border-orange-500"
          />
        )}
        <div className="text-center">
          <h2 className="text-xl font-bold text-white">{session.user?.name}</h2>
          <p className="text-zinc-400 text-sm">{session.user?.email}</p>
        </div>
      </Card>

      <div>
        <h3 className="text-white font-semibold mb-3">Tu actividad</h3>
        <div className="grid grid-cols-3 gap-3">
          <StatCard icon={<ClipboardList size={28} />} value={stats.lists} label="Listas" />
          <StatCard icon={<Bike size={28} />} value={stats.bikes} label="Motos" />
          <StatCard icon={<FileText size={28} />} value={stats.notes} label="Notas" />
        </div>
      </div>
    </div>
  );
}
