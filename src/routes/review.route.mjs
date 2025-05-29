// File Routes: Definir los Endpoints de una entidad
import { Router } from 'express';       // Importando el Router de Express
import { createReview, getReviewById } from '../controllers/review.controller.mjs';
const router = Router();                // Invocando Router (Preparandolo para definir rutas)

// Define las rutas de acceso 
router.post( '/api/reviews', createReview );
router.get( '/api/reviews/:id', getReviewById );


export default router;                  // Exportando todas las rutas de esta entidad para ser usadas en cualquier parte de la aplicacion