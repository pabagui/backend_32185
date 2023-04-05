import crypto from 'crypto'

import { Producto } from '../models/producto.js'

const productosMap = {}

export function getProductos(campo, valor) {
    const productos = Object.values(productosMap)
    if (campo && valor) {
        return productos.filter(p => p[campo] == valor)
    } else {
        return productos
    }
}

export function getProducto(id) {
    if (!productosMap[id]) {
        throw new Error('Producto no encontrado.')
    }
    return productosMap[id]
}

export function createProducto(datos) {
    const id = crypto.randomBytes(10).toString('hex')
    const nuevoProducto = new Producto(id, datos)
    productosMap[id] = nuevoProducto.datos()
    return nuevoProducto.datos()
}

export function updateProducto(id, datosNuevos) {
    if (!productosMap[id]) {
        throw new Error('Producto no encontrado')
    }
    const datosAnteriores = productosMap[id]
    const datos = { ...datosAnteriores, ...datosNuevos }
    const productoActualizado = new Producto(id, datos)
    productosMap[id] = productoActualizado.datos()
    return productoActualizado.datos()
}

export function deleteProducto(id) {
    if (!productosMap[id]) {
        throw new Error('Producto no encontrado')
    }
    const productoBorrado = productosMap[id]
    delete productosMap[id]
    return productoBorrado
}