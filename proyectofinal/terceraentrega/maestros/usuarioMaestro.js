import { randomUUID } from "crypto";
import { contenedorUsuarios } from "./contenedorMaestro"; // ¿as users?
import  { createCart } from './carritoMaestro'
import { logger } from "../logger/pino";
import { encryptPassword } from "../admin/security";



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
  

  export async function findEmail(email) {
    try {
      const user = await contenedorUsuarios.getEmail(email)
      return user
    } catch (err) {
      logger.error(err)
      throw new Error(err.message)
    }
  }