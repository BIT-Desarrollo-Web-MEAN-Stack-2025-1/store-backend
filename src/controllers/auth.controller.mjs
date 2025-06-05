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

const reNewToken = ( req, res ) => {
    const payload = req.authUser;

    const token = generateToken( payload );

    res.json({ token });
}


export {
    loginUser,
    reNewToken
}