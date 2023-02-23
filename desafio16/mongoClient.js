// mongodb+srv://admin:<password>@cluster0.iygr0f4.mongodb.net/test

import { MongoClient } from 'mongodb';
import { CNX_STR, DB_NAME } from './config.js';

const mongoClient = new MongoClient(CNX_STR)
await  mongoClient.connect()

export const mongoDataBase = mongoClient.db(DB_NAME)