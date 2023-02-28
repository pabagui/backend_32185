import { notify } from "./aws.js"
import { randomUUID } from "crypto"

// import { productosDao } from "./productosDao"
const productosDao = require('./productosDao')

export const get = async (req, res) => {
    try {
        const productos = await productosDao.read()
        res.json(productos)
    } catch (error) {
        console.error('Ocurrió un error: ', error)
        res.sendStatus(500)
    }
}

export const getById = async (req, res) => {
    try {
        const producto = await productosDao.read(req.params.id)
        res.json(producto)
    } catch (error) {
        console.error('Ocurrió un error: ', error)
        res.sendStatus(500)
    }
}

export const post = async (req, res) => {
    const newProduct = req.body
    newProduct.productId = randomUUID()

    try {
        await productosDao.create(newProduct)
        console.log('se guardó')
    } catch (error) {
        console.error('Ocurrió un error: ', error)
        return res.sendStatus(500)
    }

    try {
        const notificacion = await notify({
            subject: 'nuevo producto',
            message: `nuevo producto agregado! ${JSON.stringify(newProduct)}`,
        })
        console.log('se notificó!')
    } catch (error) {
        console.error('Ocurrió un error al notificar! ', error)
    }

    res.status(201).json(newProduct)
}

export const put = async (req, res) => {
    try {
        const producto = {
            ...req.body,
            productId: req.params.id,
        }
        await productosDao.update(producto)
        res.json(producto)
    } catch (error) {
        console.error('Ocurrió un error: ', error)
        res.sendStatus(500)
    }
}

export const deleteP = async (req, res) => {
    try {
        const borrado = await productosDao.deleteProd(req.params.id)
        res.sendStatus(204)
    } catch (error) {
        console.error('Ocurrió un error: ', error)
        res.sendStatus(500)
    }
}