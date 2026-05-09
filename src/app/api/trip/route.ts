import { getActiveTrip, createTrip } from "@/backend/controllers/TripController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getActiveTrip(req);
}

export async function POST(req: NextRequest) {
  return createTrip(req);
}
