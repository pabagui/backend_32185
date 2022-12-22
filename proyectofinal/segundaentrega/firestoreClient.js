
import admin from "firebase-admin";
import fs from 'fs';

const serviceAccount = JSON.parse(await fs.promises.readFile('./config/ecommercebe-47be4-firebase-adminsdk-8ybru-21661cb9c3.json', 'utf-8'));
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

export const firestoreDatabase = admin.firestore();