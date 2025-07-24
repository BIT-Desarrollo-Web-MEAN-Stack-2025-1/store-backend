import express from 'express';

const router = express.Router();

// Define las rutas para la entidad user
router.get( '/', ( req, res ) => {
    const msg = 'Bienvenido al API de Store';
    console.log( msg );
    res.status(200).json({ msg });
} );


export default router;