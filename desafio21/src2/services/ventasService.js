import { listaDeProductos } from '../repositories/listaDeProductos/index.js'
import { registroDeVentas } from '../repositories/registroDeVentas/index.js'
import { Venta } from '../models/venta.js'

class VentasService {
    async vender({ id, cantidad }) {
        const prod = await listaDeProductos.buscarPorId(id)
        prod.disminuirStock(cantidad)
        await listaDeProductos.guardar(prod)

        const nuevaVenta = new Venta()
        nuevaVenta.agregarItem({ id, precio: prod.precio, cantidad })
        await registroDeVentas.guardar(nuevaVenta)

        return nuevaVenta
    }
}

export const ventasService = new VentasService()