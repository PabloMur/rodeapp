import { updateBike, deleteBike } from "@/backend/controllers/BikeController";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return updateBike(req, params.id);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  return deleteBike(params.id);
}
