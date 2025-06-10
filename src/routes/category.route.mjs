import express from 'express';      // Importo la dependencia
import { createCategory, getAllCategories, getCategoryById, removeCategoryById, updateCategoryById } from '../controllers/category.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();    // Invocando el Router de Express

// Defnir las rutas para la entidad Product.
router.post( '/api/categories', authUser, createCategory );
router.get( '/api/categories', authUser, getAllCategories );

// :id (Paramentrizar la ruta: Creamos una especie de variable)
router.get( '/api/categories/:id', authUser, getCategoryById );
router.delete( '/api/categories/:id', authUser, removeCategoryById ); 
router.patch( '/api/categories/:id', authUser, updateCategoryById ); 


// Exponer el router de este archivo para ser usado por otros en la aplicacion
export default router;