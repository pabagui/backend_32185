import express from 'express'
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

/*
apiRouter.get('/api/images', (req, res) => {
    const file = req.file
    // const file = req.body.name
    res.send(file);
})
*/

//por configurar:

// apiRouter.post('/api/users', , )
// apiRouter.get('/api/users', , )

// apiRouter.post('/api/sessions', , )

// apiRouter.post('/api/products', , )
// apiRouter.get('/api/products', , )
// apiRouter.get('/api/products/{id}', , )
// apiRouter.put('/api/put', , )
// apiRouter.delete('/api/products', , )

// apiRouter.post('/api/shoppingcartproducts', , )
// apiRouter.get('/api/shoppingcartproducts', , )
// apiRouter.delete('/api/shoppingcartproducts', , )

// apiRouter.post('/api/orders', , )
// apiRouter.get('/api/orders', , )
