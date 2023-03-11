import express from 'express';
import { Router } from 'express';
// import { getAllProducts, getProductsById, saveProduct, updateById, deleteById } from '../controladores/controladorProductos.js'
import { getAllProducts, getProductsById, saveProduct, updateById, deleteById } from '../../src/controladores/controladorProductos.js'
import { valAuthenticate } from '../../admin/authLogin.js';
import { onlyForAdmins } from '../../admin/adminArea.js';

export const routerApiProd = Router();
// export const routerApiProd = express.Router();


routerApiProd.get('/', getAllProducts)
routerApiProd.get('/:id', getProductsById)
routerApiProd.post('/', valAuthenticate, onlyForAdmins, saveProduct)
routerApiProd.put('/:id', valAuthenticate, onlyForAdmins, updateById)
routerApiProd.delete('/:id', onlyForAdmins, valAuthenticate, deleteById)