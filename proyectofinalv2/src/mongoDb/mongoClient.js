import { MongoClient } from 'mongodb';
import { CNX_STR_MONGOATLAS, CNX_STR_MONGOLOCAL, DB_NAME } from '../../config/config.js';

const mongoClient = new MongoClient(CNX_STR_MONGOATLAS);
// const mongoClient = new MongoClient(CNX_STR_MONGOLOCAL);
await mongoClient.connect();

export const mongoDataBase = mongoClient.db(DB_NAME)