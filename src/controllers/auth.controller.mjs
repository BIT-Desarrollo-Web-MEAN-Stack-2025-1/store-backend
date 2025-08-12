import bcrypt from 'bcrypt'; 

import userModel from "../schemas/user.schema.mjs";
import { generateToken } from '../helpers/jwt.helper.mjs';

// Autenticacion
const loginUser = async ( req, res ) => {
    // Paso 1: Obtener los datos del body
    const inputData = req.body;

    // Paso 2: Verificar si el usuario existe (Por favor registrese)
    const userFound = await userModel.findOne({ email: inputData.email });

    if( ! userFound ) {
        return res.json({ msg: 'El usuario no existe. Por favor registrese' });
    }
    // Paso 3: Verificar la contrasenia (si cohincide)
    const isAuthenticated = bcrypt.compareSync(
        inputData.password,         // PASSWORD ORIGINAL
        userFound.password          // Hash Password
    );

    if( ! isAuthenticated ) {
        return res.json({ msg: 'Contrasenia invalida' });
    }

    // Paso 4: Generar credencial digital (Token)
    const payload = {
        name: userFound.name,
        email: userFound.email,
        role: userFound.role
    };

    const token = generateToken( payload );

    // Paso 5: Eliminar algunas propiedades que traen datos sensibles
    const objsUser = userFound.toObject();      // Convertir un BJSON en Objeto JavaScript

    delete objsUser.password;
    delete objsUser.createdAt;
    delete objsUser.updatedAt;

    // Paso 6: Respuesta al cliente
    res.json({
        token,
        user: objsUser
    });
}

const registerUser = async ( req, res ) => {
    const inputData = req.body;

    try {
        // Paso 1: Verificar si el usuario existe
        const userFound = await userModel.findOne({ 
            $or: [
                { username: inputData.username },
                { email: inputData.email }
            ]
        });

        if( userFound ) {
            // Para duplicados lo correcto es 409
            return res.status( 409 ).json({ msg: 'No pudo registrarse por que, el usuario ya existe.' });
        }

        // Paso 2: Encriptar la contrasena
        const salt = bcrypt.genSaltSync();
        // console.log( 'salt: ', salt );          // Genero una cadena aleatoria   

        // Mezclar y generar el hash
        const hashPassword = bcrypt.hashSync(
            inputData.password,         // PASSWORD_ORIGINAL
            salt                        // Cadena aletoria
        );
        // console.log( 'hashPassword: ', hashPassword );  // HashPassword

        inputData.password = hashPassword;      // Reemplazar el password original por password encriptado

        // Paso 3: Registrar el usuario
        const userCreated = await userModel.create( inputData );

        // Paso 5: Convertir a objeto plano y eliminar campos sensibles
        const data = userCreated.toObject();
        delete data.password;
        delete data.createdAt;
        delete data.updatedAt;
        delete data.__v; // Opcional: eliminar versión de Mongoose

        // Paso 6: Responder al cliente que se registro existosamente
        res.status( 201 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear el usuario' });
    }

}

const reNewToken = ( req, res ) => {
    const payload = req.authUser;

    const token = generateToken( payload );

    res.json({ token });
}


export {
    loginUser,
    reNewToken,
    registerUser
}