import * as productos from '../services/productosService.js'

export function getProductos(args) {
    const { campo, valor } = args
    return productos.getProductos(campo, valor)
}

export function getProducto(args) {
    const { id } = args
    return productos.getProducto(id)
}

export function createProducto({ datos }) {
    return productos.createProducto(datos)
}

export function updateProducto({ id, datos }) {
    return productos.updateProducto(id, datos)
}

export function deleteProducto({ id }) {
    return productos.deleteProducto(id)
}