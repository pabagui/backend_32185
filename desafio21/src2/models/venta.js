import { VentaDto } from '../dtos/ventaDto.js'

export class Venta {
    #items
    constructor({ items = [] } = { items: [] }) {
        this.#items = items
    }

    agregarItem({ id, precio, cantidad }) {
        this.#items.push({ id, precio, cantidad })
    }

    datos() {
        return new VentaDto({
            items: this.#items
        })
    }
}