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

    async getAll() { 
        try {
          return await this.coleccion.find({}).toArray()
        } catch (err) {
          logger.error(err)
          throw new Error('error al buscar en bbdd')
        }
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


    async updateByObject(currentObject, newObject) { 
        try {
        console.log("UPDATE BY OBJECT")
        console.log("OLD: ", currentObject)
        console.log("NEW: ", newObject)
        return await this.coleccion.updateOne(currentObject, { $set: newObject })
        } catch (err) {
        logger.error(err)
        throw new Error('Error al actualizar objeto en bbdd')
        }
    }

    async updateById(id, update) {  
        try {
        const result = await this.coleccion.updateOne({ id: id }, { $set: update })
        console.log(`Items actualizados: ${result.modifiedCount}`)
        return result.modifiedCount
        } catch (err) {
        logger.error(err)
        throw new Error('Error al actualizar item en bbdd')
        }
    }


    async deleteById(object) {
        try {
        await this.coleccion.deleteOne({ id: object.id })
        } catch (err) {
        logger.error(err)
        throw new Error('error al eliminar por id en bbdd');
        }
    }

    async deleteAll() {
        try {
          await this.coleccion.deleteMany({});
        } catch (err) {
          logger.error(err);
          throw new Error('error al eliminar items en bbdd');
        }
      }


    async getEmail(email) {
        try {
          return await this.coleccion.findOne({ email: email })
        } catch (err) {
          logger.error(err)
          throw new Error('error al obtener email de bbdd')
        }
      }

}