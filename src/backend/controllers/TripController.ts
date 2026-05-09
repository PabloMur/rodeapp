import { TripModel } from "@/backend/models/TripModel";
import { NextRequest, NextResponse } from "next/server";

export async function getActiveTrip(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email") || "";
    const trip = await TripModel.getActiveByEmail(email);
    return NextResponse.json({ trip });
  } catch {
    return NextResponse.json({ error: "Error al obtener el viaje" }, { status: 500 });
  }
}

export async function createTrip(req: NextRequest) {
  try {
    const data = await req.json();
    const trip = await TripModel.create({
      ...data,
      status: "active",
      startedAt: new Date().toISOString(),
    });
    return NextResponse.json({ trip }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear el viaje" }, { status: 500 });
  }
}

export async function endTrip(_req: NextRequest, id: string) {
  try {
    await TripModel.end(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al terminar el viaje" }, { status: 500 });
  }
}
