import { usuariosDao } from "../daos/usuariosDao.js"
import { agregar } from '../daos/mongodbDao.js'


export class UsuarioService {
    #usuariosDao

    constructor( usuariosDao ) {
        this.#usuariosDao = usuariosDao
    }

    async guardar(user) {
        await this.#usuariosDao.guardar(user)
        const usuarioCarrito = {email: user.email, products: []}
        await agregar('carts', usuarioCarrito)
        return user
    }

    async buscar(email) {
        const users = await this.#usuariosDao.buscar(email)
        return users
    }
}




export const usuarioService = new UsuarioService( usuariosDao )