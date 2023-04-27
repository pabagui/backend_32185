import dotenv from 'dotenv'

dotenv.config({path:'./config/.env'}) //ver si funciona el path 

//MongoDB

// export const CNX_STR_MONGOATLAS = process.env.URLMONGOATLAS
export const CNX_STR_MONGOATLAS = 'mongodb+srv://coderhouse:coderhouse@cluster0.tgslabx.mongodb.net/coderhouse'
// export const CNX_STR_MONGOLOCAL = process.env.URLMONGOLOCAL
export const CNX_STR_MONGOLOCAL = 'mongodb://localhost:27017'

export const DB_NAME = 'coderhouse'
export const PERSISTENCIA = 'mongodb'

//Sessions

export const SESSION_SECRET = process.env.SESSION_SECRET
// export const PRIVATE_KEY = process.env.PRIVATE_KEY
export const PRIVATE_KEY = "privatekey" 


export const PORT = parseInt(process.argv[2]) || 8080 //ver si funciona esto
export const NODE_ENV = process.env.NODE_ENV //para desarrollo o producción


export const NODEMAILER_CONFIG = {
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.nodemailer_user,
        pass: process.env.nodemailer_pass
    }
}

export const admin_email = process.env.admin_email

