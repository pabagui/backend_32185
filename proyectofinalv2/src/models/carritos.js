import crypto from 'crypto'
import { CarritoDto } from '../dtos/carritosDto.js';


function crearId() {
    return crypto.randomUUID()
}

export class Carrito {
    #id
    #productos
    #cantidades

   
        constructor({ id = crearId(), productos, cantidades }) {
            this.#id = id
            this.#productos = productos
            this.#cantidades = cantidades
        }

        get id() { return this.#id }

        asDto() {
            return new CarritoDto({
                id: this.#id,
                productos: this.#productos,
                cantidades: this.#cantidades,

            })           
        }
    }
