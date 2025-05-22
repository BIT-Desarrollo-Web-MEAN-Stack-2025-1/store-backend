// File Routes: Definir los Endpoints de una entidad
import { Router } from 'express';       // Importando el Router de Express
import { createProduct } from '../controllers/product.controller.mjs';
const router = Router();                // Invocando Router (Preparandolo para definir rutas)

// Define las rutas de acceso y las vincula a su respectivo controlador
router.post( '/api/products', createProduct );



export default router;                  // Exportando todas las rutas de esta entidad para ser usadas en cualquier parte de la aplicacion