import { ventasService } from '../services/ventasService.js'
import { DatosNuevaVenta } from '../validators/datosNuevaVenta.js'

export async function postVentas(req, res, next) {
    try {
        const datosNuevaVentas = new DatosNuevaVenta(req.body)
        const venta = await ventasService.vender(datosNuevaVentas)
        res.status(201).json(venta)
    } catch (error) {
        next(error)
    }
}