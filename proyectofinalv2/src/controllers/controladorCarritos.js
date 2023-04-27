import { logger } from '../../config/logger.js'
import { buscar, actualizarCarrito} from '../daos/mongodbDao.js'


// postProductToCartController,
// getProductsInCartController,
// deleteProductByIdInCartController





export async function postProductToCartController(req, res) {
    const {productId} = req.body
    await buscar("carts")
    .then(async result => {
        const cartIndex = result.findIndex(r => r.email === req.user.email)
        const search = result.find(r => r.email === req.user.email)
        const products = search.products
        await buscar("products")
        .then(async resul => {
            const newCartProduct = resul.find(c => c._id === productId)
            if (!newCartProduct) {
                logger.error(`Error al agregar al carrito el producto con id: ${productId}`)
                res.status(404);
                res.json({message: `Error al agregar al carrito el producto con id: ${productId}`});
            } else {
                const existProductIndex = products.findIndex(p => p._id === productId)
                if (existProductIndex === -1) {
                    newCartProduct.quantity = 1
                    const newCart = [...result[cartIndex].products, newCartProduct]
                    result[cartIndex].products = newCart
                    await actualizarCarrito('carts', result[cartIndex].products, req.user.email)
                    logger.info(`Carrito con producto agregado, idProd: ${productId} `)
                    res.status(201);
                    res.json(result[cartIndex]);
                } else {
                    result[cartIndex].products[existProductIndex].quantity ++
                    await actualizarCarrito('carts', result[cartIndex].products, req.user.email)
                    logger.info(`Carrito con producto agregado, idProd: ${productId} `)
                    res.status(201);
                    res.json(result[cartIndex]);
                }
            }
        })
        .catch(err => {
            logger.error(`Error al agregar productos al carrito: ${err}`)
            res.status(500);
            res.json({message: err})
        })
    })
    .catch(err => {
        logger.error(`Error al agregar productos al carrito: ${err}`)
        res.status(500);
        res.json({message: err})
    })
}



export async function getProductsInCartController(req, res) {
    await buscar("carts")
    .then(result => {
        const search = result.find(c => c.email === req.user.email);
        if (!search) {
            logger.error(`Error al buscar el carrito`)
            res.status(404);
            res.json({message: `Error al buscar el carrito`});
        } else {
            res.status(200);
            res.json(search.products);
        }
    })
    .catch(err => {
        logger.error(`Error al buscar el carrito: ${err}`)
        res.status(500);
        res.json({message: err})
    })
}



export async function deleteProductByIdInCartController(req, res) {
    const {id_prod} = req.params
    await buscar("carts")
    .then(async result => {
        const idSearch = result.findIndex(c => c.email === req.user.email)
        if (idSearch === -1) {
            logger.error(`Carrito no encontrado para eliminar producto`)
            res.status(404);
            res.json({message: `Carrito no encontrado para eliminar producto`});
        } else {
            const products = result[idSearch].products
            const existProductIndex = products.findIndex(p => p._id === id_prod)
            if (existProductIndex === -1) {
                logger.info(`Producto no está en el carrito`)
                res.status(200);
                res.json(result[idSearch]);
            } else {
                if (result[idSearch].products[existProductIndex].quantity > 1) {
                    result[idSearch].products[existProductIndex].quantity --
                    await actualizarCarrito('carts', result[idSearch].products, req.user.email)
                } else {
                    const newProducts = products.filter(o => o._id !== id_prod)
                    result[idSearch].products = newProducts
                    await actualizarCarrito('carts', result[idSearch].products, req.user.email)
                }
                logger.info(`Producto eliminado del carrito: ${id_prod}`)
                res.status(200);
                res.json(result[idSearch]);
            }
        }
    })
    .catch(err => {
        logger.error(`Error al eliminar producto del carrito: ${err}`)
        res.status(500);
        res.json({message: err})
    })
}
