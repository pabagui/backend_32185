import { saveProducts, replaceProductById, deleteProduct } from "../../maestros/productoMaestro.js";
import { contenedorProductos } from "../../maestros/contenedorMaestro.js";
import { logger } from "../../logger/pino.js";


export async function getAllProducts(req, res) {
        try {
        res.status(200).json(await contenedorProductos.getAll())
        } catch (err) {
        logger.error(err.message)
        throw err
        }
    }
    
export  async function getProductsById({ params }, res) {
        try {
        let product = await contenedorProductos.getById(params.id)

        if (!product) {
            res.status(404).json({ error: 'producto no encontrado' })
        } else {
            res.status(200).json(product)
        }
        } catch (err) {
        logger.error(err.message)
        throw err
        }
    }
    
export  async function saveProduct({ body }, res) {
        try {
        const object = body
        delete object.email
        delete object.password
        const result = await saveProducts(object)
        res.status(201).json(result)
        } catch (err) {
        logger.error(err.message)
        throw err
        }
    }
    
export  async function updateById({ body, params }, res) {
        try {
        const object = body
        await updateProductsById(params.id, object)
        res.status(200).json(object)
        } catch (err) {
        logger.error(err.message)
        throw new Error('error al actualizar producto')
        }
    }
    
export  async function deleteById({ params }, res) {
        try {
        await deleteOne(params.id)
        res.status(200).json({ message: 'item eliminado' })
        } catch (err) {
        logger.error(err.message)
        throw new Error('error al eliminaar item')
        }
    }
    
export  async function deleteAll(req, res) {
        try {
        await contenedorProductos.deleteAll()
        res.status(200).json({ message: 'items eliminados' })
        } catch (err) {
        logger.error(err.message)
        throw err
        }
    }
  
