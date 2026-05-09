export interface BikeData {
  id?: string;
  brand: string;
  model: string;
  year: number;
  displacement: number;
  tankCapacity: number;
  fuelEfficiency: number;
  ownerEmail: string;
}

export interface TripData {
  id?: string;
  ownerEmail: string;
  origin: string;
  destination: string;
  bikeId: string;
  bikeName: string;
  estimatedKm?: number;
  status: "active" | "completed";
  startedAt: string;
  endedAt?: string;
}
