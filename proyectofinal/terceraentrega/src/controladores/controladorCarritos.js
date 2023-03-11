import { createCart, saveProductsInCart, getProductsInCart, deleteProductsInCart, deleteProduct } from "../../maestros/carritoMaestro.js";
import { logger } from "../../logger/pino.js";
import { findEmail } from "../../maestros/usuarioMaestro.js";
import { sendEmail } from '../../config/nodeMailer.js'



async function showUser(email) {
        try {
        const user = await findEmail(email);
        if (!user) throw new Error('email no encontrado')
        return user
        } catch (err) {
        logger.error(err.message)
        throw new Error(err.message)
        }
    }
  
export async function newCartCreation (req, res) { 
        try {
        const id = await createCart()
        res.status(201);
        res.json({ 'id de carrito': id })
        } catch (err) {
        logger.error(err.message)
        throw new Error('error en creación de carrito')
        }
    }
  

 export async function addProductsToCart({ body }, res) { 
        const { email, idProd } = body
        try {
        const user = await showUser(email)
        const { idCart } = user
        await saveProductsInCart(idCart, idProd)
        } catch (err) {
        logger.error(err.message)
        throw new Error(err.message)
        }
        res.sendStatus(200)
    }
  


  export async function showProducts({ body }, res) { 
        const { email } = body
        try {
        const user = await showUser(email)
        const prods = await getProductsInCart(user.idCart)
    
        if (prods.length === 0) {
            res.status(200).json({ Message: 'carrito vacío' })
        } else {
            res.status(200).json(prods)
        }
        } catch (err) {
        logger.error(err.message)
        throw new Error('error al mostrar lista de carrito');
        }
    }
    
  
  
  export async function deleteProductInCart({ body, params }, res) { 
        const { email } = body
        const { id_prod } = params
        try {
        const user = await showUser(email)
        const { idCart } = user
        await deleteProduct(idCart, id_prod)
        res.status(200).json({ message: 'producto eliminado del carrito' })
        } catch (err) {
        logger.error(err.message)
        return res.json({ Error: err.message })
        }
    }
    
  
  
  export async function emptyCart({ body }, res) { 
        const { email } = body
        try {
        const user = await showUser(email)
        const { idCart } = user
        await deleteProductsInCart(idCart)
        } catch (err) {
        logger.error(err.message)
        throw new Error(err.message)
        }
        res.sendStatus(200)
    }
  
  async function createRegisterProducts(items) {
    const register = {
      prodsTotal: 0,
      products: []
    }
    try {
      const prodMap = new Map()
      for (const item of items) {
        if (prodMap.has(item.name)) {
          prodMap.get(item.name).cant++
        } else {
          const product = {
            name: item.name,
            price: item.price,
            id: item.id,
            cant: 1
          }
          prodMap.set(item.name, product)
        }
      }
      register.totalProducts = items.length
      register.products = Array.from(prodMap.values())
      return register
    } catch (err) {
      logger.error(err)
      throw new Error(err.message)
    }
  }
  
  
  export async function buyProducts({ body }, res) {
        const { email } = body
        try {
        const user = await showUser(email)
        const { idCart } = user
        const prods = await getProductsInCart(idCart)
        if (prods.length === 0) return res.status(405).json({ message: 'carrito vacío' })
        const register = await createRegisterProducts(prods)
    
        await deleteProductsInCart(idCart)
        const messageToAdmin = {
            from: '<admin@admin>',
            to: '<admin@admin>',
            subject: 'Nueva orden de compra',
            text: `OC
                Detalle:
                Nombre: ${user.name}
                Apellido: ${user.lastname}
                Email: ${email}
                id: ${user.id}
                Productos: ${register.totalProducts}
                Registro: ${JSON.stringify(register, null, 2)}
                `,
            html: `<h1>Nueva OC</h1>
                    <h2>dETALLE:</h2>
                <ul>
                    <li><strong>Name buyer:</strong> ${user.name}</li>
                    <li><strong>Lastname buyer:</strong> ${user.lastname}</li>
                    <li><strong>Email buyer:</strong> ${email}</li>
                    <li><strong>ID buyer:</strong> ${user.id}</li>
                    <li><strong>Total products:</strong> ${register.totalProducts}</li>
                    <li><strong>Registro:</strong> ${JSON.stringify(register, null, 2)}</li>
                </ul>
                `
        }
    
        const messageToBuyer = {
            from: '<admin@admin>',
            to: `<${email}>`,
            subject: 'Confirmación de compra',
            text: `
                Detalle:
                Email: ${email}
                Productos: ${register.totalProducts}
                Registro: ${JSON.stringify(register, null, 2)}
                `,
            html: `
                    <h3>Orden de compra</h3>
                <ul>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Productos:</strong> ${register.totalProducts}</li>
                    <li><strong>Registro:</strong> ${JSON.stringify(register, null, 2)}</li>
                </ul>
                `
        }
        sendEmail.send(messageToAdmin)
        sendEmail.send(messageToBuyer)
    
    
        res.status(201).json({ message: 'purchase received' })
        } catch (err) {
        logger.error(err.message)
        throw new Error(err.message)
        }
  }