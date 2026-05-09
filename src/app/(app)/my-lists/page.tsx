"use client";
import { ClipboardList } from "lucide-react";
import MiniList from "@/components/MiniList";
import { useGetUserList } from "@/hooks";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";
import { PageHeader, EmptyState, Button } from "@/components/ui";
import { useGoTo } from "@/hooks";

export default function MyListPage() {
  const getUserLists = useGetUserList();
  const goto = useGoTo();
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserLists();
        setLists(response.data.lists || []);
      } finally {
        setLoaded(true);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-[88vh] bg-black p-4 flex flex-col gap-4 relative">
      <Loader />
      <PageHeader
        title="Mis Listas"
        subtitle="Todas tus listas de viaje"
        action={
          <Button size="sm" onClick={() => goto("/lists")}>
            + Nueva
          </Button>
        }
      />

      {loaded && lists.length === 0 ? (
        <EmptyState
          icon={<ClipboardList size={56} />}
          title="Sin listas aún"
          description="Creá tu primera lista de verificación para organizar tu próximo viaje."
          action={<Button onClick={() => goto("/lists")}>Crear lista</Button>}
        />
      ) : (
        <div className="flex flex-col gap-2">
          {lists.map((list) => (
            <MiniList key={list.id} id={list.id} title={list.name} />
          ))}
        </div>
      )}
    </div>
  );
}
