import { deleteNote } from "@/backend/controllers/NoteController";
import { NextRequest } from "next/server";

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  return deleteNote(params.id);
}
