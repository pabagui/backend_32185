import { Router } from "express"
// import  { productosControllerAws }  from "./productosControllerAws.js"
import './productosControllerAws.js'
// const  { productosControllerAws } = require('./productosControllerAws')

export const productosRouterAws = Router()

productosRouterAws.get('/', productosControllerAws.get)
productosRouterAws.get('/:id', productosControllerAws.getById)
productosRouterAws.post('/', productosControllerAws.post)
productosRouterAws.put('/:id', productosControllerAws.put)
productosRouterAws.delete('/:id', productosControllerAws.deleteP)



// exports.productosRouterAws = productosRouterAws