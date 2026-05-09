import { firestore } from "@/lib/FirebaseConn";

export type NoteCategory = "general" | "planificacion" | "en-ruta" | "recordatorio";

export interface NoteData {
  id?: string;
  title: string;
  content: string;
  category: NoteCategory;
  ownerEmail: string;
  createdAt: number;
}

export class NoteModel {
  static async getByEmail(email: string): Promise<NoteData[]> {
    const snapshot = await firestore
      .collection("notes")
      .where("ownerEmail", "==", email)
      .get();
    return snapshot.docs
      .map((doc) => ({ id: doc.id, ...doc.data() } as NoteData))
      .sort((a, b) => b.createdAt - a.createdAt);
  }

  static async create(data: Omit<NoteData, "id">): Promise<NoteData> {
    const docRef = await firestore.collection("notes").add(data);
    return { id: docRef.id, ...data };
  }

  static async delete(id: string): Promise<void> {
    await firestore.collection("notes").doc(id).delete();
  }
}
