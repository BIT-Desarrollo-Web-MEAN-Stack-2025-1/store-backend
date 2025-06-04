import jwt from 'jsonwebtoken';

// Middleware
const authUser = ( req, res, next ) => {
    const token = req.header( 'X-Token' );  // Extraemos el token de la cabecera

    // Verifica que el token no venga vacio.
    if( ! token ) {
        return res.json({ msg: 'Error: al obtener el token' });
    }

    const JWT_SECRET = '874th5t645643643y67n4';

    // Verificamos el token
    const payload = jwt.verify( token, JWT_SECRET );

    // Eliminamos propiedades adicionales
    delete payload.iat;
    delete payload.exp;

    // Crear una propiedad en el Objeto Request de Express y guardar el payload
    req.authUser = payload;

    console.log( req );    

    next();
}

export {
    authUser
}