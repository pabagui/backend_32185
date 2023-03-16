import ContenedorMySql from './ContenedorMySql.js';
import { mysqlConfig } from '../config/config.js';
import createKnexClient from 'knex';


const client = createKnexClient(mysqlConfig)
const table = 'products'

export const ContenedorProductos = new ContenedorMySql(client, table)