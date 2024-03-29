import { randomUUID } from "crypto";
import { contenedorUsuarios } from "./contenedorMaestro.js"; // ¿as users?
import  { createCart } from './carritoMaestro.js'
import { logger } from "../logger/pino.js";
import { encryptPassword } from "../admin/security.js";



export async function createUser(body) {
    try {
      const idCart = await createCart()
      const id = randomUUID()
      body.password = encryptPassword(body.password)
      const user = { id, ...body, idCart }
      user.admin = false
      const savedUser = await contenedorUsuarios.save(user)
      return savedUser
    } catch (err) {
      logger.error(err)
      throw new Error('error al crear usuario')
    }
  }
  fin

  export async function findEmail(email) {
    try {
      const user = await contenedorUsuarios.getEmail(email)
      return user
    } catch (err) {
      logger.error(err)
      throw new Error(err.message)
    }
  }