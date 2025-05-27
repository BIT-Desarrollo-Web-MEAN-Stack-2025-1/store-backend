import express from 'express';      // Importo la dependencia

import { createProduct, getAllProducts, getProductById } from '../controllers/product.controller.mjs';

const router = express.Router();    // Invocando el Router de Express

// Defnir las rutas para la entidad Product.
router.post( '/api/products', createProduct );
router.get( '/api/products', getAllProducts );

// :id (Paramentrizar la ruta: Creamos una especie de variable)
router.get( '/api/products/:id', getProductById );          


// Exponer el router de este archivo para ser usado por otros en la aplicacion
export default router;