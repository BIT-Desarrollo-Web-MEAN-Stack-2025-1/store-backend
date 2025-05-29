// File Routes: Definir los Endpoints de una entidad
import { Router } from 'express';       // Importando el Router de Express
import { createReview, deleteReviewById, getReviewById, updateReviewById } from '../controllers/review.controller.mjs';
const router = Router();                // Invocando Router (Preparandolo para definir rutas)

// Define las rutas de acceso 
router.post( '/api/reviews', createReview );

// Parametrizar las rutas
router.get( '/api/reviews/:id', getReviewById );
router.delete( '/api/reviews/:id', deleteReviewById );
router.patch( '/api/reviews/:id', updateReviewById );


export default router;                  // Exportando todas las rutas de esta entidad para ser usadas en cualquier parte de la aplicacion