import dotenv from 'dotenv'
dotenv.config()
// const cnxStr = 'mongodb+srv://admin:<password>@cluster0.iygr0f4.mongodb.net/test' original de mongoexport const CNX_STR = 'mongodb+srv://admin:1234@cluster0.iygr0f4.mongodb.net/test'
// const cnxStrRemota = 'mongodb+srv://admin:1234@cluster0.iygr0f4.mongodb.net/test'

// const cnxStrRemota = 'mongodb+srv://admin:1234@cluster0.opcwmlg.mongodb.net/test'
export const cnxStrRemota = process.env.cnxStrRemota
// export const CNX_STR = cnxStrRemota
export const CNX_STR = process.env.CNX_STR
// export const DB_NAME = 'ecommerce'
export const DB_NAME = process.env.DB_NAME
// export const PERSISTENCIA = process.env.PERSISTENCIA
export const CNX_sessions = process.env.CNX_sessions

// export const PERSISTENCIA = 'mongodb'
// export const PERSISTENCIA = 'firestore'
// export const PERSISTENCIA = 'fs'

// export const PORT = 8080

// export const SESSION_SECRET = 'secreto'

export const PORT = process.env.PORT || 8080 // puerto original: comentar cuanto use pm2
// export const PORT = parseInt(process.arg[2]) || 8080 //puerto para pm2: descomentar cuando use pm2
// export const PORT = ParsedArgs(process.argv.PORT) ?? 8080 //minimist

// export const PERSISTENCIA = process.env.PERSISTENCIA
export const SESSION_SECRET = process.env.SESSION_SECRET
export const MODO = process.env.MODO ?? 'fork'

//HASH
export const SECRET = process.env.HASH_SECURITY + process.env.SALT_ROUNDS + process.env.LINE_SECRET;


// EMAILS
export const NODEMAILER_CONFIG = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
};