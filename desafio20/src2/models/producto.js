import { ErrorFaltaDeStock } from '../errors/errorFaltaDeStock.js'
import { ProductDto } from '../dtos/productoDto.js'

export class Producto {
    #id
    #stock
    #precio

    constructor({ id, precio, stock }) {
        this.#id = id
        this.#stock = stock
        this.#precio = precio
    }

    disminuirStock(cantidad) {
        if (this.#stock >= cantidad) {
            this.#stock -= cantidad
        } else {
            throw new ErrorFaltaDeStock(this.#id)
        }
    }

    get id() {
        return this.#id
    }

    get stock() {
        return this.#stock
    }

    get precio() {
        return this.#precio
    }

    datos() {
        return new ProductDto({
            id: this.#id,
            stock: this.#stock,
            precio: this.#precio,
        })
    }
}