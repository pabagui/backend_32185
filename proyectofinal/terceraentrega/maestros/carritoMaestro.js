import { randomUUID } from "crypto";
import { contenedorCarritos, contenedorProductos } from "./contenedorMaestro";
import { logger } from "../logger/pino";



export async function createCart() { 
    try {
      const cartId = randomUUID()
      const cart = {
        id: cartId,
        products: []
      }
      const savedCart = await contenedorCarritos.save(cart)
      return savedCart.id
    } catch (err) {
      logger.error(err)
      throw new Error('error en creación de carrito')
    }
  }
  
  
  export async function saveProductsInCart(idCart, idProd) { 
    let prodsArray = []
    try {
      const product = await contenedorProductos.getById(idProd)
      const cart = await contenedorCarritos.getById(idCart)
      if (!cart) throw new Error('no existe carrito')
  
      if (cart.products.length > 0) prodsArray = cart.products.slice()
  
      prodsArray.push(product)
      const updateCart = {
        id: cart.id,
        products: prodsArray.slice()
      }
      await contenedorCarritos.updateByObject(cart, updateCart)
    } catch (err) {
      logger.error(err)
      throw new Error('error al guardar en carrito')
    }
  }
  

  export async function getProductsInCart(idCart) {
    try {
      const cart = await contenedorCarritos.getById(idCart)
      return cart.products
    } catch (err) {
      logger.error(err)
      throw new Error('error al obterner productos en carrito')
    }
  }
  
  
  
  export async function deleteProduct(idCart, idProd) {  
    try {
      const cart = await contenedorCarritos.getById(idCart)
      const newCart = {
        id: cart.id,
        products: cart.products.slice()
      }
  
      const objIndex = newCart.products.findIndex(obj => obj.id === idProd)
      if (objIndex >= 0) {
        newCart.products.splice(objIndex, 1)
      } else {
        throw new Error('id de producto no encontrado')
      }
  
      await contenedorCarritos.updateByObject(cart, newCart)
    } catch (err) {
      logger.error(err)
      throw new Error(err.message)
    }
  }
  
  

  export async function deleteProdsInCart(idCart) {
    try {
      const cart = await contenedorCarritos.getById(idCart)
      if (cart) { 
        const updateCart = {
          id: cart.id,
          products: []
        }
        await contenedorCarritos.updateByObject(cart, updateCart)
      }
    } catch (err) {
      logger.error(err)
      throw new Error('error al borrar los productos de carrito')
    }
  }
  