import { mysqlConfig } from "../config.js";
import createKnex from 'knex';

const mySqlClient = createKnex(mysqlConfig)

export async function createTable(tableName) {
  try {
    const table = await mySqlClient.schema.hasTable(tableName)
    if (!table) {
      await mySqlClient.schema.createTable(tableName, table => {
        table.string('id').primary()
        table.string('name')
        table.string('message')
      });
    }
  } catch (error) {
    throw error;
  }
}
