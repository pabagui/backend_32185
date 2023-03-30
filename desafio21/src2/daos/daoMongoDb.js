import { ErrorIdNoEncontrado } from '../errors/errorIdNoEncontrado.js'

export class DaoMongoDb {
    #collection
    constructor(collection) {
        this.#collection = collection
    }

    async guardar(dto) {
        await this.#collection.insertOne(dto)
    }

    async buscarPorId(id) {
        const dto = await this.#collection.findOne({ id })
        if (!dto) throw new ErrorIdNoEncontrado(id)
        return dto
    }

    async actualizar(id, dto) {
        const result = await this.#collection.replaceOne({ id }, dto)
        if (result.matchedCount === 0) throw new ErrorIdNoEncontrado(id)
        if (result.modifiedCount === 0) throw new Error(id)
        return dto
    }

    async borrarPorId(id) {
        const dto = await this.#usuariosDb.deleteOne({ id })
        if (!dto) throw new ErrorIdNoEncontrado(id)
        return dto
    }

    async borrarTodos() {
        await this.#usuariosDb.deleteMany({})
    }
}