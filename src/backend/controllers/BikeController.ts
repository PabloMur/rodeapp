import { BikeModel } from "@/backend/models/BikeModel";
import { NextRequest, NextResponse } from "next/server";

export async function getBikes(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email") || "";
    const bikes = await BikeModel.getByEmail(email);
    return NextResponse.json({ bikes });
  } catch {
    return NextResponse.json({ error: "Error al obtener las motos" }, { status: 500 });
  }
}

export async function createBike(req: NextRequest) {
  try {
    const data = await req.json();
    const bike = await BikeModel.create(data);
    return NextResponse.json({ bike }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear la moto" }, { status: 500 });
  }
}

export async function updateBike(req: NextRequest, id: string) {
  try {
    const data = await req.json();
    await BikeModel.update(id, data);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al actualizar la moto" }, { status: 500 });
  }
}

export async function deleteBike(id: string) {
  try {
    await BikeModel.delete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar la moto" }, { status: 500 });
  }
}
