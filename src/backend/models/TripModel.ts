import { firestore } from "@/lib/FirebaseConn";

export interface TripData {
  id?: string;
  ownerEmail: string;
  origin: string;
  destination: string;
  bikeId: string;
  bikeName: string;
  estimatedKm?: number;
  status: "active" | "completed";
  startedAt: string;
  endedAt?: string;
}

export class TripModel {
  static async getActiveByEmail(email: string): Promise<TripData | null> {
    const snapshot = await firestore
      .collection("trips")
      .where("ownerEmail", "==", email)
      .where("status", "==", "active")
      .limit(1)
      .get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() } as TripData;
  }

  static async create(data: Omit<TripData, "id">): Promise<TripData> {
    const docRef = await firestore.collection("trips").add(data);
    return { id: docRef.id, ...data };
  }

  static async end(id: string): Promise<void> {
    await firestore.collection("trips").doc(id).update({
      status: "completed",
      endedAt: new Date().toISOString(),
    });
  }
}
