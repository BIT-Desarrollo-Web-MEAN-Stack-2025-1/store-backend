import jwt from 'jsonwebtoken';


const generateToken = ( payload ) => {

    const token = jwt.sign( 
        payload,                // Carga Util
        process.env.JWT_SECRET, // Palabra semilla o secreta
        { expiresIn: '1h' }     // Opciones de configuracion del Token
    );

    return token;
}

const verifyToken = ( token ) => {
    const payload = jwt.verify( 
        token,                  // token valido
        process.env.JWT_SECRET  // Palabra semilla o secreta
    );

    return payload;
}


export {
    generateToken,
    verifyToken
}