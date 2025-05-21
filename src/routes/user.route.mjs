// File Routes: Definir los Endpoints de una entidad
import { Router } from 'express';       // Importando el Router de Express
const router = Router();                // Invocando Router (Preparandolo para definir rutas)

// Define las rutas de acceso 
router.get( '/api/users', ( req, res ) => {
    res.send( 'Obtiene todos los usuarios' );
} );
router.post( '/api/users', ( req, res ) => {
    res.send( 'Crear un usuario' );
} );
router.patch( '/api/users', ( req, res ) => {
    res.send( 'Actualizacion parcial de un usuario' );
} );
router.put( '/api/users', ( req, res ) => {
    res.send( 'Actualizacion total de un usuario' );
} );
router.delete( '/api/users', ( req, res ) => {
    res.send( 'Elimina un usuario' );
} );


export default router;                  // Exportando todas las rutas de esta entidad para ser usadas en cualquier parte de la aplicacion