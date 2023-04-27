import { productosDao } from "../daos/productosDao.js"

export class ProductoService {
    #productosDao

    constructor( productosDao ) {
        this.#productosDao = productosDao
    }

    async guardar(producto) {
        await this.#productosDao.guardar(producto)
        return producto
    }

    async buscar() {
        const prods = await this.#productosDao.buscar()
        if (prods) {
            return prods
        }
    }

    async buscarPorId(id) {
        const prods = await this.#productosDao.buscarPorId(id)
        if (prods) {
            return prods
        }
    }

    async borrarPorId(id) {
        const result = await this.#productosDao.borrarPorId(id)
        return result
    }

    async actualizarPorId(id, dto) {
        const result = await this.#productosDao.actualizarPorId(id, dto)
        if (result) {
            return result
        }
    }

    async borrarTodos() {
        const result = await this.#productosDao.borrarTodos()
            return result
    }




}

export const productoService = new ProductoService(productosDao)