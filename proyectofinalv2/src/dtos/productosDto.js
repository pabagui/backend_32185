/*
import crypto from 'crypto'

function crearId() {
    return crypto.randomUUID()
}
*/

/*

//para que sean privados hay que declararlos antes, si no no funciona
export class ProductoDto {
    // constructor({ id = crearId(), name, description, price, image }) {
        constructor({ idProd, name, description, price, image }) {
            this.#idProd = idProd
            this.#name = name
            this.#description = description
            this.#price = price
            this.#image = image //ver cómo asociar imagen a la subida por multer -url
        }
    }
*/
    export class ProductoDto {
        // constructor({ id = crearId(), name, description, price, image }) {
            constructor({ _id, name, description, price, image }) {
                this._id = _id
                this.name = name
                this.description = description
                this.price = price
                this.image = image //ver cómo asociar imagen a la subida por multer -url
            }
        } 