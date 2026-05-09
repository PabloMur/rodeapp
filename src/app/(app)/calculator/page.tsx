"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Fuel, Coins, OctagonAlert, MapPin } from "lucide-react";
import axios from "axios";
import { Card, Input, Select, PageHeader, StatCard, Button } from "@/components/ui";

interface BikeData {
  id: string;
  brand: string;
  model: string;
  year: number;
  tankCapacity: number;
  fuelEfficiency: number;
}

interface Result {
  liters: number;
  cost: number;
  stops: number;
  range: number;
}

export default function Calculator() {
  const { data: session } = useSession();
  const [bikes, setBikes] = useState<BikeData[]>([]);
  const [selectedBike, setSelectedBike] = useState("");
  const [distance, setDistance] = useState("");
  const [fuelPrice, setFuelPrice] = useState("");
  const [tankCapacity, setTankCapacity] = useState("");
  const [fuelEfficiency, setFuelEfficiency] = useState("");
  const [result, setResult] = useState<Result | null>(null);

  const email = session?.user?.email || "";

  useEffect(() => {
    if (email) {
      axios
        .get(`/api/bike?email=${email}`)
        .then((res) => setBikes(res.data.bikes || []))
        .catch(() => {});
    }
  }, [email]);

  useEffect(() => {
    if (!selectedBike) return;
    const bike = bikes.find((b) => b.id === selectedBike);
    if (bike) {
      setTankCapacity(String(bike.tankCapacity));
      setFuelEfficiency(String(bike.fuelEfficiency));
    }
  }, [selectedBike, bikes]);

  function calculate() {
    const d = parseFloat(distance);
    const eff = parseFloat(fuelEfficiency);
    const price = parseFloat(fuelPrice);
    const tank = parseFloat(tankCapacity);
    if (!d || !eff || !price) return;

    const liters = d / eff;
    const cost = liters * price;
    const range = tank > 0 ? tank * eff : 0;
    const stops = range > 0 ? Math.max(0, Math.ceil(d / range) - 1) : 0;
    setResult({ liters, cost, stops, range });
  }

  const bikeOptions = bikes.map((b) => ({
    value: b.id,
    label: `${b.brand} ${b.model} (${b.year})`,
  }));

  return (
    <div className="min-h-[88vh] bg-black p-4 flex flex-col gap-4">
      <PageHeader
        title="Calculadora"
        subtitle="Estimá el combustible de tu próximo viaje"
      />

      <Card variant="bordered">
        <div className="flex flex-col gap-4">
          {bikes.length > 0 && (
            <Select
              label="Moto (auto-completa los valores)"
              options={bikeOptions}
              placeholder="Seleccionar moto"
              value={selectedBike}
              onChange={(e) => setSelectedBike(e.target.value)}
            />
          )}

          <Input
            label="Distancia del viaje (km)"
            type="number"
            placeholder="500"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Consumo (km/L)"
              type="number"
              placeholder="18"
              value={fuelEfficiency}
              onChange={(e) => setFuelEfficiency(e.target.value)}
            />
            <Input
              label="Precio combustible ($/L)"
              type="number"
              placeholder="1200"
              value={fuelPrice}
              onChange={(e) => setFuelPrice(e.target.value)}
            />
          </div>

          <Input
            label="Capacidad del tanque (L)"
            type="number"
            placeholder="15"
            hint="Necesario para calcular paradas"
            value={tankCapacity}
            onChange={(e) => setTankCapacity(e.target.value)}
          />

          <Button
            fullWidth
            size="lg"
            onClick={calculate}
            disabled={!distance || !fuelEfficiency || !fuelPrice}
          >
            Calcular
          </Button>
        </div>
      </Card>

      {result && (
        <div>
          <h2 className="text-white font-bold text-lg mb-3">Resultado</h2>
          <div className="grid grid-cols-2 gap-3">
            <StatCard icon={<Fuel size={28} />} value={`${result.liters.toFixed(1)} L`} label="Combustible total" />
            <StatCard
              icon={<Coins size={28} />}
              value={`$${result.cost.toLocaleString("es-AR", { maximumFractionDigits: 0 })}`}
              label="Costo estimado"
            />
            <StatCard icon={<OctagonAlert size={28} />} value={result.stops} label="Paradas de carga" />
            {result.range > 0 && (
              <StatCard
                icon={<MapPin size={28} />}
                value={`${result.range.toFixed(0)} km`}
                label="Autonomía por tanque"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
