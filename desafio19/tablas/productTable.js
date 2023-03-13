import { mysqlConfig } from "../config.js";
import createKnex from 'knex';

const mySqlClient = createKnex(mysqlConfig)

export async function createTable(tableName) {
  try {
    const table = await mySqlClient.schema.hasTable(tableName)
    if (!table) {
      await clientMSql.schema.createTable(tableName, table => {
        table.string('id').primary()
        table.string('name')
        table.integer('price')
        table.string('description')
        table.string('thumbnail')
      })
    }
  } catch (error) {
    throw error;
  }
}