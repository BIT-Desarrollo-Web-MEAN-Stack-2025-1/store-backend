import express from 'express';      // Importo la dependencia
import { createCategory } from '../controllers/category.controller.mjs';

const router = express.Router();    // Invocando el Router de Express

// Defnir las rutas para la entidad Product.
router.post( '/api/categories', createCategory );



// Exponer el router de este archivo para ser usado por otros en la aplicacion
export default router;