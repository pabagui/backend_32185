// mongodb+srv://admin:<password>@cluster0.iygr0f4.mongodb.net/test

import { MongoClient } from 'mongodb';
import { CNX_STR, DB_NAME } from '../../config/config.js';
import  { logger } from '../../logger/pino.js'

const mongoClient = new MongoClient(CNX_STR)
try {
    await  mongoClient.connect()
} catch (err) {
    logger.error(err.message)
    // console.log(err.message)
    throw err
}


export const mongoDataBase = mongoClient.db(DB_NAME)