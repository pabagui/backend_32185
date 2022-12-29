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
export const PERSISTENCIA = 'mongodb'
// export const PERSISTENCIA = 'firestore'
// export const PERSISTENCIA = 'fs'


export  const mysqlConfig = {
    client: 'mysql2',
    connection: options
    // connection: 'mysql://coder:house@localhost:3306/coderhouse'
}

export const port = 8080




