import dotenv from 'dotenv'

dotenv.config({path:'./config/.env'}) //ver si funciona el path 

dotenv.config({
    path: process.env.NODE_ENV
    ? '.env'
    : 'dev.env'
}) 

//MongoDB

// export const CNX_STR_MONGOATLAS = process.env.URLMONGOATLAS
export const CNX_STR_MONGOATLAS = 'mongodb+srv://coderhouse:coderhouse@cluster0.tgslabx.mongodb.net/coderhouse'
// export const CNX_STR_MONGOLOCAL = process.env.URLMONGOLOCAL
export const CNX_STR_MONGOLOCAL = 'mongodb://localhost:27017'

export const CNX_STR = process.env.URLMONGODB
export const MONGODB_CNX_STR = process.env.MONGODB_CNX_STR ?? 'mongodb://localhost:27017'

export const DB_NAME = 'coderhouse'
export const PERSISTENCIA = 'mongodb'

//Sessions

// export const SESSION_SECRET = process.env.SESSION_SECRET
export const SESSION_SECRET='secreto'
// export const PRIVATE_KEY = process.env.PRIVATE_KEY
export const PRIVATE_KEY = "privatekey" 

export const PORT = process.env.PORT ?? 8080
// export const PORT = parseInt(process.argv[2]) || 8080 //ver si funciona esto
export const NODE_ENV = process.env.NODE_ENV //para desarrollo o producción


export const NODEMAILER_CONFIG = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASS
    }
}

// export const admin_email = process.env.admin_email
export const admin_email='admin@123.com'

