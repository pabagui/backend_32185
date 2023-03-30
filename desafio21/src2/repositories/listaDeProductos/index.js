import { MODO_PERSISTENCIA } from '../../config/persistencia.js'
import { ListaDeProductos } from './listaDeProductos.js'

let listaDeProductos

switch (MODO_PERSISTENCIA) {
    case 'file':
        const { DaoArchivo } = await import('../../daos/daoFile.js')
        const dao = new DaoArchivo('./localStorage/productos.json')
        listaDeProductos = new ListaDeProductos(dao)
        break
    default:
        const { mongoClient } = await import('../../database/mongoClient.js')
        const { DaoMongoDb } = await import('../../daos/daoMongoDb.js')
        const coleccionDeProductos = mongoClient.db().collection('products')
        const daoMongoDb = new DaoMongoDb(coleccionDeProductos)
        listaDeProductos = new ListaDeProductos(daoMongoDb)
}


export { listaDeProductos } 