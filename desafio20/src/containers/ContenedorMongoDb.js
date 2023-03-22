import { mongoDataBase } from "../services/mongoClient.js";

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

    async getById(id) {
        const cosa = await this.collection.findOne({ _id: id })
        if (!cosa) throw new Error(`${this.nombreColeccion} no encontrado`)
        cosa.id = cosa._id
        delete cosa._id
        return cosa
    }

    async replaceById(cosa) {
        try {
            cosa._id = cosa.id
            delete cosa.id
            await  this.collection.replaceOne(cosa)       
        } catch (error) {
            throw new Error(`${this.nombreColeccion} no encontrado`)
        }          
    }
}