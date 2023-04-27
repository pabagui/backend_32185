/*
import crypto from 'crypto'

function crearId() {
    return crypto.randomUUID()
}
*/

export class OrdenDto {
    // constructor({ idOrden = crearId(), fecha, idCliente, prods }) {
        constructor({ idOrden, fecha, idCliente, prods }) {
            this.#idOrden = idOrden
            this.#fecha = fecha
            this.#idCliente = idCliente
            this.#prods = prods
        }
    }


    //prods es un array de objetos idProd

    //id debiera ser el del usuario idCliente
    
/*
ejemplo

{
    id: 1,
    fecha: (timestamp)
    idCliente: 1,
    prods: [ 
      { 
      prod: {
        id,
        name,
        description,
        price,
        image,
      },
      cant: 2
    },
    { 
      prod: {
        id,
        name,
        description,
        price,
        image,
      },
      cant: 1
    }
   ],
  }

  */