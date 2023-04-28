import { logger } from '../../config/logger.js';
import { mongoDataBase } from '../mongoDb/mongoClient.js';


export async function buscar(name) {
    try {
        const dto = await mongoDataBase.collection(name).find().toArray()
        return dto
    } catch (err) {
        logger.error(`error de búsqueda en base de datos: ${err}`)
        return(err)
    }
}

export async function buscarPorId(name, _id) {
    try {
        const dto = await mongoDataBase.collection(name).findOne({_id})
        return dto
    } catch (err) {
        logger.error(`error de búsqueda en base de datos: ${err}`)
        return(err)
    }
}

export async function agregar(name, data) {
    try {
        await mongoDataBase.collection(name).insertOne(data)
    } catch (err) {
        logger.error(`error al agregar a base de datos: ${err}`)
        return(err)
    }
}

export async function actualizarPorId(name, data, id) {
    try {
        await mongoDataBase.collection(name).replaceOne({_id: id}, {_id: id, name: data.name, description: data.description, image: data.image, price: data.price})
    } catch (err) {
        logger.error(`error al actualizar producto en base de datos: ${err}`)
        return(err)
    }
}

export async function actualizarCarrito(name, data, email) {
    try {
        await mongoDataBase.collection(name).replaceOne({email: email}, {email: email, products: data})
    } catch (err) {
        logger.error(`error al actualizar carrito: ${err}`)
        return(err)
    }
}

export async function borrar(name, id) {
    try {
        await mongoDataBase.collection(name).deleteOne({_id: id}) 
    } catch (err) {
        logger.error(`error al borrar carrito: ${err}`)
        return(err)
    }
}
