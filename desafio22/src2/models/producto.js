import { ErrorFaltaDeStock } from '../errors/errorFaltaDeStock.js'
import { ProductDto } from '../dtos/productoDto.js'

export class Producto {
    #id
    #name
    #stock
    #precio

    constructor({ id, name,  precio, stock }) {
        this.#id = id
        this.#name = name
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

    get name() {
        return this.#name
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
            name: this.#name, 
            stock: this.#stock,
            precio: this.#precio,
        })
    }
}