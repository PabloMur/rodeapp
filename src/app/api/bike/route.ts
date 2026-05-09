import { getBikes, createBike } from "@/backend/controllers/BikeController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getBikes(req);
}

export async function POST(req: NextRequest) {
  return createBike(req);
}
