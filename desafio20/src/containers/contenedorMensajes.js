import ContenedorMySql from './ContenedorMySql.js'
import { mysqlConfig } from '../config.js';
import createKnexClient from 'knex';

const client = createKnexClient(mysqlConfig)
const table = 'messages'


export const ContenedorMensajes = new ContenedorMySql(client, table)