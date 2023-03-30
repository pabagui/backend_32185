import { MODO_PERSISTENCIA } from '../../config/persistencia.js'
import { RegistroDeVentas } from './registroDeVentas.js';

let registroDeVentas

switch (MODO_PERSISTENCIA) {
    case 'file':
        const { DaoArchivo } = await import('../../daos/daoFile.js')
        const dao = new DaoArchivo('./localStorage/ventas.json')
        registroDeVentas = new RegistroDeVentas(dao)
        break
    default:
        const { mongoClient } = await import('../../database/mongoClient.js')
        const { DaoMongoDb } = await import('../../daos/daoMongoDb.js')
        const coleccionDeVentas = mongoClient.db().collection('ventas')
        const daoMongoDb = new DaoMongoDb(coleccionDeVentas)
        registroDeVentas = new RegistroDeVentas(daoMongoDb)
}

export { registroDeVentas } 