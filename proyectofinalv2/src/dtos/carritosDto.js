/*
import crypto from 'crypto'

function crearId() {
    return crypto.randomUUID()
}
*/

export class CarritoDto {
    // constructor({ id = crearId(), productos }) {
        constructor({ id, productos }) {
            this.#id = id
            this.#productos = productos
            this.#cantidades = cantidades
        }
    }

    //id debiera ser el del usuario
    //productos es array de objetos: usar idProd
    // cantidades no sé si viene dentro del objeto o aparte

/*
ejemplo:
{
 id: 1,
 prods: [ { idProd: 1, cant: 2 }, { idProd: 2, cant: 5} ]
}
*/