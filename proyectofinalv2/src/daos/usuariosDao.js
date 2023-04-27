import { mongoDataBase } from "../mongoDb/mongoClient.js"


export class UsuariosDao {
    #usuariosDb
    
    constructor(mongoDataBase) {
        this.#usuariosDb = mongoDataBase.collection('users')
    }

    async guardar(dto) {
        await this.#usuariosDb.insertOne(dto)
    }

    async buscar(email) {
        const dto = await this.#usuariosDb.findOne({"email": email})
        return dto
    }
}



export const usuariosDao = new UsuariosDao(mongoDataBase)