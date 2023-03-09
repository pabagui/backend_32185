import { mongoDataBase } from "./mongoClient.js"
import { logger } from "../../logger/pino.js";

export class ContenedorMongoDb {

    constructor(nombreColeccion) {
        this.coleccion = mongoDataBase.collection(nombreColeccion);
    }

    async save(cosa) {
        try {
            await this.coleccion.insertOne(cosa)
          } catch (err) {
            logger.error(err)
            throw new Error('error al guardar en bbdd')
          }
          return cosa
        
    }

    async  getSomething(criterio = {}) {
        try {
            return await this.coleccion.find(criterio).toArray()
          } catch (err) {
            logger.error(err);
            throw new Error('error al buscar en bbdd');
          }    
    }


    async getById(id) {
        try {
            const cosa = await this.collection.findOne({ _id: id })
            if (!cosa) throw new Error(`${this.nombreColeccion} no encontrado`)
            cosa.id = cosa._id
            delete cosa._id
          } catch (err) {
            logger.error(err);
            throw new Error('error al buscar por id en bbdd');
          }
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