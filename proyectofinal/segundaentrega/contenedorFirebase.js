/*
import admin from 'firebase-admin';
import { FIREBASE_CREDENTIALS } from './config/config';

// import serviceAccount from 'path/to/serviceAccountKey.json'

admin.initializeApp({
  credential: admin.credential.cert(FIREBASE_CREDENTIALS)
});
*/

import { firestoreDatabase } from "./firestoreClient.js";

function asObj(ref) {
    return { id: ref.id, ...ref.data() }
}

/*
export class ContenedorFirestore {

    constructor(nombreColeccion) {
        this.coleccion = firestoreDatabase.collection(nombreColeccion)
    }

    async save(cosa) {
        const ref = await  this.coleccion.add(cosa)
        return { ...cosa, id: ref.id }

    }

    async getSomething(criterio = {}) {
        const snapshot = await this.coleccion.get()
        const result = []
        snapshot.forEach(doc => {
            result.push(asObj(doc))
        })
        return result
    }
}
*/

export class ContenedorFirestore {

    constructor(nombreColeccion) {
        this.coleccion = firestoreDatabase.collection(nombreColeccion)
    }

    async save(cosa) {
        const ref = await  this.coleccion.add(cosa)
        return { ...cosa, id: ref.id }

    }

    async getSomething(criterio = {}) {
        const snapshot = await this.coleccion.get()
        const result = []
        snapshot.forEach(doc => {
            result.push(asObj(doc))
        })
        return result
    }
}