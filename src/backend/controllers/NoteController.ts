import { NoteModel } from "@/backend/models/NoteModel";
import { NextRequest, NextResponse } from "next/server";

export async function getNotes(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email") || "";
    const notes = await NoteModel.getByEmail(email);
    return NextResponse.json({ notes });
  } catch {
    return NextResponse.json({ error: "Error al obtener las notas" }, { status: 500 });
  }
}

export async function createNote(req: NextRequest) {
  try {
    const data = await req.json();
    const note = await NoteModel.create({ ...data, createdAt: Date.now() });
    return NextResponse.json({ note }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error al crear la nota" }, { status: 500 });
  }
}

export async function deleteNote(id: string) {
  try {
    await NoteModel.delete(id);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error al eliminar la nota" }, { status: 500 });
  }
}
