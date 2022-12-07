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

export  const mysqlConfig = {
    client: 'mysql2',
    connection: options
    // connection: 'mysql://coder:house@localhost:3306/coderhouse'
}

export const port = 8080




