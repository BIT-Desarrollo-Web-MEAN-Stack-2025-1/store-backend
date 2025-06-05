import jwt from 'jsonwebtoken';

const JWT_SECRET = '874th5t645643643y67n4';

const generateToken = ( payload ) => {

    const token = jwt.sign( 
        payload,                // Carga Util
        JWT_SECRET,             // Palabra semilla o secreta
        { expiresIn: '1h' }     // Opciones de configuracion del Token
    );

    return token;
}

const verifyToken = ( token ) => {
    const payload = jwt.verify( 
        token,                  // token valido
        JWT_SECRET              // Palabra semilla o secreta
    );

    return payload;
}


export {
    generateToken,
    verifyToken
}