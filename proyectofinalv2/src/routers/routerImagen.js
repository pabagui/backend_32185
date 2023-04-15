import { Router } from 'express'
import { middlewareDeUnArchivo, middlewareDeVariosArchivos } from '../middlewares/middlewareImagen.js'
import { uploadFileController, uploadFilesController } from '../controllers/controladorImagen.js'

export const apiRouter = new Router()

apiRouter.post('/api/images', middlewareDeUnArchivo, uploadFileController)
apiRouter.post('/api/images', middlewareDeVariosArchivos, uploadFilesController)
apiRouter.get('/api/images', (req, res) => {
    const file = req.body
    // const file = req.body.name
    res.send(file);
})


//por configurar
/*
apiRouter.post('/api/users', , )
apiRouter.get('/api/users', , )

apiRouter.post('/api/sessions', , )

apiRouter.post('/api/products', , )
apiRouter.get('/api/products', , )
apiRouter.get('/api/products/{id}', , )
apiRouter.put('/api/put', , )
apiRouter.delete('/api/products', , )

apiRouter.post('/api/shoppingcartproducts', , )
apiRouter.get('/api/shoppingcartproducts', , )
apiRouter.delete('/api/shoppingcartproducts', , )

apiRouter.post('/api/orders', , )
apiRouter.get('/api/orders', , )
*/