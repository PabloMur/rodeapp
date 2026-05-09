import * as admin from "firebase-admin";

if (!process.env.FIRESTORE_API_KEY) {
  throw new Error("FIRESTORE_API_KEY is not set in environment variables");
}

const serviceAccount = JSON.parse(process.env.FIRESTORE_API_KEY);

admin.apps.length
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });

const firestore = admin.firestore();

export { firestore };
