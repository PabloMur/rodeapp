import { firestore } from "@/lib/FirebaseConn";

export interface BikeData {
  id?: string;
  brand: string;
  model: string;
  year: number;
  displacement: number;
  tankCapacity: number;
  fuelEfficiency: number;
  ownerEmail: string;
}

export class BikeModel {
  static async getByEmail(email: string): Promise<BikeData[]> {
    const snapshot = await firestore
      .collection("bikes")
      .where("ownerEmail", "==", email)
      .get();
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as BikeData));
  }

  static async create(data: Omit<BikeData, "id">): Promise<BikeData> {
    const docRef = await firestore.collection("bikes").add(data);
    return { id: docRef.id, ...data };
  }

  static async update(id: string, data: Partial<BikeData>): Promise<void> {
    await firestore.collection("bikes").doc(id).update(data);
  }

  static async delete(id: string): Promise<void> {
    await firestore.collection("bikes").doc(id).delete();
  }
}
