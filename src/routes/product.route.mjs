// File Routes: Definir los Endpoints de una entidad
import { Router } from 'express';       // Importando el Router de Express
const router = Router();                // Invocando Router (Preparandolo para definir rutas)

// Define las rutas de acceso 
router.get( '/api/products', ( req, res ) => {
    res.send( 'Obtiene todos los productos' );
} );
router.post( '/api/products', ( req, res ) => {
    res.send( 'Crear un producto' );
} );
router.patch( '/api/products', ( req, res ) => {
    res.send( 'Actualizacion parcial de un producto' );
} );
router.put( '/api/products', ( req, res ) => {
    res.send( 'Actualizacion total de un producto' );
} );
router.delete( '/api/products', ( req, res ) => {
    res.send( 'Elimina un producto' );
} );


export default router;                  // Exportando todas las rutas de esta entidad para ser usadas en cualquier parte de la aplicacion