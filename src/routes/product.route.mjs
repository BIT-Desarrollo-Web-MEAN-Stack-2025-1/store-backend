import express from 'express';      // Importo la dependencia

import { createProduct, getAllProducts, getProductById, removeProductById, updateProductById } from '../controllers/product.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();    // Invocando el Router de Express

// Defnir las rutas para la entidad Product.
router.post( '/api/products', authUser, createProduct );
router.get( '/api/products', getAllProducts );

// :id (Paramentrizar la ruta: Creamos una especie de variable)
router.get( '/api/products/:id', getProductById );          
router.delete( '/api/products/:id', authUser, removeProductById );
router.patch( '/api/products/:id', authUser, updateProductById );     // Actualizacion total o parcial


// Exponer el router de este archivo para ser usado por otros en la aplicacion
export default router;