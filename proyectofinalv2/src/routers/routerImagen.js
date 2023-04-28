import { Router } from 'express'
import { middlewareDeUnArchivo, middlewareDeVariosArchivos } from '../middlewares/middlewareImagen.js'
import { uploadFileController, uploadFilesController, getImageController } from '../controllers/controladorImagen.js'


export const routerApiImages = new Router()

routerApiImages.post('/api/images', middlewareDeUnArchivo, uploadFileController)
routerApiImages.post('/api/images', middlewareDeVariosArchivos, uploadFilesController)
// apiRouter.get('/api/images', express.static('../uploads'))
routerApiImages.get('/uploads', getImageController)
/*
apiRouter.get('/api/images', (req, res) => {
    
    res.send(express.static('../uploads'));
})
*/

