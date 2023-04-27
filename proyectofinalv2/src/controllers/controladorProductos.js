import { logger } from "../../config/logger.js"
import { Producto } from "../models/productos.js"
import { productoService } from '../services/productosService.js'

// postProductController
// getProductsController
// getProductByIdController
// updateProductByIdController
// deleteProductByIdController

export async function postProductController(req, res, next) {
    try {
        const productoNuevo = new Producto(req.body)
        // const producto = await productoService.guardar(productoNuevo)
        const producto = await productoService.guardar(productoNuevo.asDto())

        res.status(201).json(producto)
        // res.json(producto)
    } catch (error) {
        next(error)
    }
}


export async function getProductsController(req, res, next) {
    try {
        const productos = await productoService.buscar()
        res.json(productos)
    } catch (err) {
        logger.error(`Error al buscar productos: ${err}`)
        res.status(500);
        res.json({mensaje: err})
    }
}

export async function getProductByIdController(req, res, next) {
    try {
        const producto = await productoService.buscarPorId(req.params.id)
        if (producto) {
            res.json(producto)
        } else {
            logger.error(`Error al buscar producto con id: ${req.params.id}`)
            res.status(404);
            res.json({message: `Error al buscar producto con id: ${req.params.id}`});
        }
    } catch (err) {
        logger.error(`Error al buscar producto: ${err}`)
        res.status(500);
        res.json({mensaje: err})
    }
}

export async function updateProductByIdController({body, params: {id}}, res, next) {
    try {
        const result = await productoService.actualizarPorId(id, body)
        if (result.modifiedCount === 0) {
            logger.error(`Error al actualizar producto con id: ${id}`)
            res.status(404);
            res.json({message: `Error al actualizar producto con id: ${id}`});
        } else {
            res.json(body)           
        }
    } catch (err) {
        logger.error(`Error al actualizar producto: ${err}`)
        res.status(500);
        res.json({mensaje: err})
    }
}

export async function deleteProductByIdController(req, res, next) {
    try {
        const result = await productoService.borrarPorId(req.params.id)
        if (result.deletedCount === 0) {
            logger.error(`Error al eliminar producto con id: ${req.params.id}`)
            res.status(404);
            res.json({message: `Error al eliminar producto con id: ${req.params.id}`});
        } else {
            res.json(req.params.id)
        }
    } catch (err) {
        logger.error(`Error al eliminar producto: ${err}`)
        res.status(500);
        res.json({mensaje: err})
    }
}