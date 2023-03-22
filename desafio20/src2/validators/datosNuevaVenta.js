import { ErrorArgumentosInvalidos } from '../errors/errorArgumentosInvalidos.js'

export class DatosNuevaVenta {
    constructor({ id, cantidad }) {
        this.id = Math.floor(Number(id))
        if (isNaN(this.id))
            throw new ErrorArgumentosInvalidos('id debe ser un número entero')
        this.cantidad = Math.floor(Number(cantidad))
        if (isNaN(this.cantidad))
            throw new ErrorArgumentosInvalidos('cantidad debe ser un número entero')
    }
}