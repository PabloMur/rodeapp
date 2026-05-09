"use client";
import { Card, Badge, Button } from "@/components/ui";

interface BikeCardProps {
  id: string;
  brand: string;
  model: string;
  year: number;
  displacement: number;
  tankCapacity: number;
  fuelEfficiency: number;
  onDelete: (id: string) => void;
}

export default function BikeCard({
  id,
  brand,
  model,
  year,
  displacement,
  tankCapacity,
  fuelEfficiency,
  onDelete,
}: BikeCardProps) {
  const range = (tankCapacity * fuelEfficiency).toFixed(0);

  return (
    <Card variant="bordered" className="w-full">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-bold text-white text-lg">
            {brand} {model}
          </h3>
          <p className="text-zinc-400 text-sm">{year}</p>
        </div>
        <Badge status="orange" label={`${displacement}cc`} />
      </div>
      <div className="flex gap-6 mt-3 text-sm">
        <div>
          <p className="text-zinc-500 text-xs">Tanque</p>
          <p className="text-white font-medium">{tankCapacity} L</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs">Consumo</p>
          <p className="text-white font-medium">{fuelEfficiency} km/L</p>
        </div>
        <div>
          <p className="text-zinc-500 text-xs">Autonomía</p>
          <p className="text-white font-medium">{range} km</p>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="danger" size="sm" onClick={() => onDelete(id)}>
          Eliminar
        </Button>
      </div>
    </Card>
  );
}
