import dotenv from 'dotenv'
import path from 'path'
import ParsedArgs from 'minimist'

dotenv.config({
    path:
        process.env.NODE_ENV === 'prod'
            ? '.env'
            : 'file.env'
})




const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: '',
        database: 'kepe'
    }
} 

// const cnxStr = 'mongodb+srv://admin:<password>@cluster0.iygr0f4.mongodb.net/test' original de mongoexport const CNX_STR = 'mongodb+srv://admin:1234@cluster0.iygr0f4.mongodb.net/test'
const cnxStrRemota = 'mongodb+srv://admin:1234@cluster0.iygr0f4.mongodb.net/test'

export const CNX_STR = cnxStrRemota
export const DB_NAME = 'ecommerce'
// export const PERSISTENCIA = 'mongodb'
// export const PERSISTENCIA = 'firestore'
// export const PERSISTENCIA = 'fs'


export  const mysqlConfig = {
    client: 'mysql2',
    connection: options
    // connection: 'mysql://coder:house@localhost:3306/coderhouse'
}

// export const PORT = 8080

// export const SESSION_SECRET = 'secreto'

export const PORT = process.env.PORT ?? 8080
// export const PORT = ParsedArgs(process.argv.PORT) ?? 8080 //minimist
export const PERSISTENCIA = process.env.PERSISTENCIA
export const SESSION_SECRET = process.env.SESSION_SECRET
export const MODO = process.env.MODO ?? 'fork'