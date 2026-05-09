"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { MapPin, Navigation } from "lucide-react";
import axios from "axios";
import { Modal, Input, Select, Button } from "@/components/ui";
import { useCreateTrip } from "@/hooks";
import { BikeData } from "@/backend/models/BikeModel";

interface CreateTripModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const emptyForm = { origin: "", destination: "", estimatedKm: "", bikeId: "" };

export default function CreateTripModal({ isOpen, onClose }: CreateTripModalProps) {
  const { data: session } = useSession();
  const createTrip = useCreateTrip();
  const [form, setForm] = useState(emptyForm);
  const [bikes, setBikes] = useState<BikeData[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen || !session?.user?.email) return;
    axios.get(`/api/bike?email=${session.user.email}`).then((res) => {
      setBikes(res.data.bikes || []);
    });
  }, [isOpen, session]);

  const bikeOptions = bikes.map((b) => ({
    value: b.id!,
    label: `${b.brand} ${b.model} (${b.year})`,
  }));

  const selectedBike = bikes.find((b) => b.id === form.bikeId);

  async function handleSubmit() {
    if (!form.origin.trim() || !form.destination.trim() || !form.bikeId) return;
    setLoading(true);
    await createTrip({
      origin: form.origin.trim(),
      destination: form.destination.trim(),
      bikeId: form.bikeId,
      bikeName: selectedBike
        ? `${selectedBike.brand} ${selectedBike.model} (${selectedBike.year})`
        : "",
      estimatedKm: form.estimatedKm ? Number(form.estimatedKm) : undefined,
    });
    setForm(emptyForm);
    setLoading(false);
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Iniciar viaje">
      <div className="flex flex-col gap-4">
        {bikes.length === 0 ? (
          <p className="text-zinc-400 text-sm text-center py-4">
            Primero agregá una moto en{" "}
            <span className="text-orange-500 font-semibold">Mis Motos</span> para poder iniciar un viaje.
          </p>
        ) : (
          <>
            <div className="flex flex-col gap-3">
              <div className="relative">
                <Input
                  label="Origen"
                  placeholder="Ciudad de salida"
                  value={form.origin}
                  onChange={(e) => setForm((f) => ({ ...f, origin: e.target.value }))}
                />
                <MapPin size={16} className="absolute right-3 top-9 text-zinc-500" />
              </div>
              <div className="relative">
                <Input
                  label="Destino"
                  placeholder="Ciudad de llegada"
                  value={form.destination}
                  onChange={(e) => setForm((f) => ({ ...f, destination: e.target.value }))}
                />
                <Navigation size={16} className="absolute right-3 top-9 text-zinc-500" />
              </div>
              <Input
                label="Kilómetros estimados (opcional)"
                placeholder="ej: 700"
                type="number"
                value={form.estimatedKm}
                onChange={(e) => setForm((f) => ({ ...f, estimatedKm: e.target.value }))}
              />
              <Select
                label="Moto"
                placeholder="Seleccioná una moto"
                options={bikeOptions}
                value={form.bikeId}
                onChange={(e) => setForm((f) => ({ ...f, bikeId: e.target.value }))}
              />
            </div>

            <Button
              onClick={handleSubmit}
              disabled={!form.origin || !form.destination || !form.bikeId || loading}
              className="w-full mt-1"
            >
              {loading ? "Iniciando..." : "Iniciar viaje"}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
