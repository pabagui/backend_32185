import express from 'express'
// import multer from 'multer'
import { apiRouter } from './routers/routerImagen.js'
// const multer = require ('multer')

const app = express()




app.use(express.urlencoded({ extended: true }))
// app.use(express.urlencoded({ extended: false }))
// app.use(express.static('public'))
// app.use("/uploads", express.static('uploads'))

/* ------------------------------------------------------ */
/* Multer config */
// const multer = require('multer')

/*
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
*/



// const upload = multer({ storage: storage })

// const middlewareDeImagenes = upload.single('miArchivo')
// const middlewareDeImagenes = upload.none()
// const middlewareDeImagenes = upload.array('imagenes', 3)
/* ------------------------------------------------------ */
/* Rutas */


app.get('/', (req, res) => {
        res.send('<h1>😃Hola servidor Express para el desafío 5</h1>');
})

app.use('/uploads', express.static('uploads'))
app.use('/', apiRouter)


/*
app.post('/api/images', middlewareDeImagenes, (req, res) => {
//   const file = req.file
  const file = req.body

  if (!file) {
    res.status(400)
    // return res.send('Error subiendo archivo')
    return res.json('Error subiendo archivo')

  }
//   res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
  res.json(`Archivo <b>${file.originalname}</b> subido exitosamente`)
// console.log(file)
})
*/

/* ------------------------------------------------------ */
/* Server Listen */
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))