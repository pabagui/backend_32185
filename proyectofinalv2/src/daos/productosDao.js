import { logger } from '../../config/logger.js'
import { mongoDataBase } from '../mongoDb/mongoClient.js'
//ver coomo uso sin logger

export class ProductosDao {
    #productosDb
    
    constructor(mongoDataBase) {
        this.#productosDb = mongoDataBase.collection('products')
    }

    async guardar(dto) {
        await this.#productosDb.insertOne(dto)
    }

    async buscar() {
        const dto = await this.#productosDb.find().toArray()
        return dto
    }

    async buscarPorId(id) {
        const dto = await this.#productosDb.findOne({id})
        return dto
    }

    async actualizarPorId(_id, dto) {
        try {
            const result = await this.#productosDb.replaceOne({ _id }, dto)
            return result
        }
        catch (err) {
            logger.error(`Actualizar error: ${err}`)
            return err
        }
    }

    async borrarPorId(_id) {
        try {
            const result = await this.#productosDb.deleteOne({ _id })
            return result
        }
        catch (err) {
            logger.error(`Eliminar error: ${err}`)
            return err
        }
    }

    async borrarTodos() {
        await this.#productosDb.deleteMany({})
    }
}

export const productosDao = new ProductosDao(mongoDataBase)