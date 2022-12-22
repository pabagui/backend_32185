import { mongoDataBase } from "./mongoClient.js";

export class ContenedorMongoDb {

    constructor(nombreColeccion) {
        this.coleccion = mongoDataBase.collection(nombreColeccion);
    }

    async save(cosa) {
        await this.coleccion.insertOne(cosa)
    }

    async  getSomething(criterio = {}) {
        return await this.coleccion.find(criterio).toArray()
    }
}