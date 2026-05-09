import { getNotes, createNote } from "@/backend/controllers/NoteController";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  return getNotes(req);
}

export async function POST(req: NextRequest) {
  return createNote(req);
}
