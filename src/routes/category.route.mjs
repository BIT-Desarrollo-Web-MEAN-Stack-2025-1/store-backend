import express from 'express';      // Importo la dependencia
import { createCategory, getAllCategories, getCategoryById, removeCategoryById, updateCategoryById } from '../controllers/category.controller.mjs';

const router = express.Router();    // Invocando el Router de Express

// Defnir las rutas para la entidad Product.
router.post( '/api/categories', createCategory );
router.get( '/api/categories', getAllCategories );

// :id (Paramentrizar la ruta: Creamos una especie de variable)
router.get( '/api/categories/:id', getCategoryById );
router.delete( '/api/categories/:id', removeCategoryById ); 
router.patch( '/api/categories/:id', updateCategoryById ); 


// Exponer el router de este archivo para ser usado por otros en la aplicacion
export default router;