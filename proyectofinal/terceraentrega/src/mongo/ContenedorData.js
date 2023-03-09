import { ContenedorMongoDb } from "./ContenedorMongoDb"

export const productContainer = new ContenedorMongoDb('products')
export const cartContainer = new ContenedorMongoDb('carts')
export const userContainer = new ContenedorMongoDb('users')