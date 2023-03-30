import { ErrorIdNoEncontrado } from '../../errors/errorIdNoEncontrado.js'
import { Venta } from '../../models/venta.js'

export class RegistroDeVentas {
    #dao
    constructor(dao) {
        this.#dao = dao
    }

    async buscarPorId(id) {
        const dto = await this.#dao.buscarPorId(id)
        if (!dto) throw new ErrorIdNoEncontrado(id)
        return new Venta(dto)
    }

    async guardar(venta) {
        let existe = true
        try {
            const dto = await this.#dao.buscarPorId(venta.id)
        } catch {
            existe = false
        }
        if (existe) {
            await this.#dao.actualizar(venta.id, venta.datos())
        } else {
            await this.#dao.guardar(venta.datos())
        }
    }
}