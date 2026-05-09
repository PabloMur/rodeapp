import { endTrip } from "@/backend/controllers/TripController";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  return endTrip(req, params.id);
}
