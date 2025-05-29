// File Routes: Definir los Endpoints de una entidad
import { Router } from 'express';       // Importando el Router de Express
import { createReview } from '../controllers/review.mjs';
const router = Router();                // Invocando Router (Preparandolo para definir rutas)

// Define las rutas de acceso 
router.get( '/api/reviews', createReview );


export default router;                  // Exportando todas las rutas de esta entidad para ser usadas en cualquier parte de la aplicacion