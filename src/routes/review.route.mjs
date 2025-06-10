// File Routes: Definir los Endpoints de una entidad
import { Router } from 'express';       // Importando el Router de Express
import { createReview, deleteReviewById, getReviewById, getReviewsByProduct, updateReviewById } from '../controllers/review.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';
const router = Router();                // Invocando Router (Preparandolo para definir rutas)

// Define las rutas de acceso 
router.post( '/api/reviews', authUser, createReview );

// Parametrizar las rutas
router.get( '/api/reviews/:id', authUser, getReviewById );
router.delete( '/api/reviews/:id', authUser, deleteReviewById );
router.patch( '/api/reviews/:id', authUser, updateReviewById );
router.get( '/api/reviews/product/:id', getReviewsByProduct );      // TODO: Alternativa (más RESTful, opcional), /api/products/:productId/reviews


export default router;                  // Exportando todas las rutas de esta entidad para ser usadas en cualquier parte de la aplicacion