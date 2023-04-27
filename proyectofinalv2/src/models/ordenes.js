import crypto from 'crypto'
import { OrdenDto } from '../dtos/ordenesDto';


function crearId() {
    return crypto.randomUUID()
}


// usar timestamp para la fecha
export class Orden {
   #idOrden
   #fecha
   #idCliente
   #prods
   
        constructor({ idOrden = crearId(), fecha, idCliente, prods }) {
                this.#idOrden = idOrden
                this.#fecha = fecha
                this.#idCliente = idCliente
                this.#prods = prods
            }

        get id() { return this.#idOrden }

        asDto() {
            return new OrdenDto({
                idOrden: this.#idOrden,
                fecha: this.#fecha,
                idCliente: this.#idCliente,
                prods: this.#prods
            })           
        }
    }

