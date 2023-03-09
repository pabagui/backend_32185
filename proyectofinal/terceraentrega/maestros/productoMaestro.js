import { randomUUID } from "crypto";
import { contenedorProductos } from "./contenedorMaestro";
import { logger } from "../logger/pino";



function validacionProducto(obj) {
    if (!obj.name) throw new Error('Nombre de producto no ingresado')
    if (!obj.price) throw new Error('Precio no ingresado')
    if (!obj.description) throw new Error('Descripción de producto no ingresada')
    if (!obj.thumbnail) throw new Error('Foto de producto no ingresada')
    return obj
  }
  
  export async function saveProducts(obj) {
    obj.id = randomUUID()
    let object = validacionProducto(obj)
    try {
      object = await contenedorProductos.save(object)
      return object
    } catch (err) {
      logger.error(err.message)
      throw new Error({ Message: err.message })
    }
  }
  

  export async function replaceProductById(id, object) {
    try {
      const currentObject = await contenedorProductos.getById(id)
      object.id = currentObject.id;
      await contenedorProductos.replaceById(currentObject, object)
    } catch (err) {
      logger.error(err.message);
      throw new Error('error en reemplazo de producto')
    }
  }

  /*
  export async function updateProdsById(id, object) {
    try {
      const currentObject = await contenedorProductos.getById(id)
      //antes hay que convertir oldObject en un objeto
      object.id = currentObject.id;
      await contenedorProductos.updateByObject(currentObject, object)
    } catch (err) {
      logger.error(err.message);
      throw new Error('error en reemplazo de producto')
    }
  }
 */

  export async function deleteProduct(id) {
    try {
      const object = await contenedorProductos.getById(id)
      if (!object) throw new Error('Producto no encontrado')
      await contenedorProductos.deleteById(object)
    } catch (err) {
      logger.error(err.message)
      throw new Error('error al eliminar producto')
    }
  }