import { Router } from 'express'
import { middlewareDeUnArchivo, middlewareDeVariosArchivos } from '../middlewares/middlewareImagen.js'
import { uploadFileController, uploadFilesController } from '../controllers/controladorImagen.js'

export const apiRouter = new Router()

apiRouter.post('/api/images', middlewareDeUnArchivo, uploadFileController)
apiRouter.post('/api/images', middlewareDeVariosArchivos, uploadFilesController)
apiRouter.get('/api/images', (req, res) => {
    // const file = req.body
    const file = req.body.name
    res.send(file);
})

