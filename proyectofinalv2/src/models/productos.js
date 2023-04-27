import crypto from 'crypto'
import { ProductoDto } from '../dtos/productosDto.js'


function crearId() {
    return crypto.randomUUID()
}

export class Producto {
    #_id
    #name
    #description 
    #price 
    #image 
   
        constructor({ _id = crearId(), name, description, price, image }) {
            this.#_id = _id
            this.#name = name
            this.#description = description
            this.#price = price
            this.#image = image //ver cómo asociar imagen a la subida por multer -url
        }

        get id() { 
            return this.#_id 
        }

        get name() { 
            return this.#name 
        }

        get price() { 
            return this.#price 
        }

        get image() { 
            return this.#image 
        }



        asDto() {
            return new ProductoDto({
                _id: this.#_id,
                name: this.#name,
                description: this.#description,
                price: this.#price,
                image: this.#image
            })           
        }
    }

