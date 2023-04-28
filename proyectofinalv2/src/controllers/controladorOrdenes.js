import { logger } from '../../config/logger.js'
import { buscar, agregar, actualizarCarrito } from '../daos/mongodbDao.js'
import { admin_email } from '../../config/config.js';
import { emailSender } from '../email/sender.js';

export async function controllerPostOrder(req, res) {
    await buscar("carts")
    .then(async result => {
        const idSearch = result.findIndex(c => c.email === req.user.email)
        const search = result.find(r => r.email === req.user.email)
        if (idSearch === -1) {
            logger.error(`Carrito no encontrado`)
            res.status(404);
            res.json({message: `Carrito no encontrado`});
        } else {
            const products = JSON.stringify(search.products)
            const newOrder = {date: Date.now(), email: req.user.email, products: search.products}
            await agregar('orders',newOrder)
            await emailSender.send({
                from: 'Kepe Ecommerce',
                to: req.user.email,
                subject: `Tu nueva orden de compra`,
                html: `<h1>Tu compra</h1><p>Listado de compra: ${products}</p>`
            })
            await emailSender.send({
                from: 'Kepe Ecommerce',
                to: admin_email,
                subject: `Tu nueva orden de compra`,
                html: `<h1>Tu compra</h1><p>Listado de compra: ${products}</p>`
            })
            const newProducts = []
            await actualizarCarrito('carts', newProducts, req.user.email)
            logger.info(`Orden de compra creada`)
            res.status(200);
            res.json(result[idSearch]);
        }
    })
    .catch(err => {
        logger.error(`Error al crear orden de compra: ${err}`)
        res.status(500);
        res.json({message: err})
    })
}

export async function controllerGetAllOrders(req, res) {
    await buscar("orders")
    .then(async result => {
        const orders = result.filter(c => c.email === req.user.email)
        res.json(orders)
    })
    .catch(err => {
        logger.error(`Error al buscar orden de compra: ${err}`)
        res.status(500);
        res.json({mensaje: err})
    })
}
