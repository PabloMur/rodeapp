"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Bike } from "lucide-react";
import axios from "axios";
import { PageHeader, EmptyState, Button, Modal, Input } from "@/components/ui";
import BikeCard from "@/components/cards/BikeCard";
import Loader from "@/components/ui/Loader";

interface BikeData {
  id: string;
  brand: string;
  model: string;
  year: number;
  displacement: number;
  tankCapacity: number;
  fuelEfficiency: number;
  ownerEmail: string;
}

const emptyForm = {
  brand: "",
  model: "",
  year: new Date().getFullYear(),
  displacement: 0,
  tankCapacity: 0,
  fuelEfficiency: 0,
};

export default function MyBikes() {
  const { data: session } = useSession();
  const [bikes, setBikes] = useState<BikeData[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);

  const email = session?.user?.email || "";

  async function fetchBikes() {
    if (!email) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const res = await axios.get(`/api/bike?email=${email}`);
      setBikes(res.data.bikes || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBikes();
  }, [email]);

  async function handleAdd() {
    if (!form.brand || !form.model) return;
    setSaving(true);
    try {
      await axios.post("/api/bike", { ...form, ownerEmail: email });
      setModalOpen(false);
      setForm(emptyForm);
      fetchBikes();
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    await axios.delete(`/api/bike/${id}`);
    setBikes((prev) => prev.filter((b) => b.id !== id));
  }

  return (
    <div className="min-h-[88vh] bg-black p-4 flex flex-col gap-4">
      {loading && <Loader />}
      <PageHeader
        title="Mis Motos"
        subtitle="Administrá tu garage"
        action={
          <Button onClick={() => setModalOpen(true)}>+ Agregar moto</Button>
        }
      />

      {!loading && bikes.length === 0 ? (
        <EmptyState
          icon={<Bike size={56} />}
          title="Sin motos registradas"
          description="Agregá tu primera moto para calcular consumo de combustible y planificar mejor tus viajes."
          action={<Button onClick={() => setModalOpen(true)}>Agregar moto</Button>}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {bikes.map((bike) => (
            <BikeCard key={bike.id} {...bike} onDelete={handleDelete} />
          ))}
        </div>
      )}

      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Nueva moto">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Marca"
              placeholder="Honda"
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
            />
            <Input
              label="Modelo"
              placeholder="CB 500"
              value={form.model}
              onChange={(e) => setForm({ ...form, model: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Año"
              type="number"
              value={form.year}
              onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
            />
            <Input
              label="Cilindrada (cc)"
              type="number"
              placeholder="500"
              value={form.displacement || ""}
              onChange={(e) =>
                setForm({ ...form, displacement: parseInt(e.target.value) || 0 })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Capacidad tanque (L)"
              type="number"
              placeholder="15"
              value={form.tankCapacity || ""}
              onChange={(e) =>
                setForm({ ...form, tankCapacity: parseFloat(e.target.value) || 0 })
              }
            />
            <Input
              label="Consumo (km/L)"
              type="number"
              placeholder="20"
              hint="Ejemplo: 18 km por litro"
              value={form.fuelEfficiency || ""}
              onChange={(e) =>
                setForm({ ...form, fuelEfficiency: parseFloat(e.target.value) || 0 })
              }
            />
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              variant="secondary"
              fullWidth
              onClick={() => {
                setModalOpen(false);
                setForm(emptyForm);
              }}
            >
              Cancelar
            </Button>
            <Button
              fullWidth
              onClick={handleAdd}
              disabled={saving || !form.brand || !form.model}
            >
              {saving ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
