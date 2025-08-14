import bcrypt from 'bcrypt';

import userModel from "../schemas/user.schema.mjs";

const createUser = async ( req, res ) => {
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
        console.log( 'salt: ', salt );          // Genero una cadena aleatoria   

        // Mezclar y generar el hash
        const hashPassword = bcrypt.hashSync(
            inputData.password,         // PASSWORD_ORIGINAL
            salt                        // Cadena aletoria
        );
        console.log( 'hashPassword: ', hashPassword );  // HashPassword

        inputData.password = hashPassword;      // Reemplazar el password original por password encriptado

        // Paso 3: Registrar el usuario
        const userCreated = await userModel.create( inputData );

        // Paso 5: Convertir a objeto plano y eliminar campos sensibles
        const data = userCreated.toObject();
        delete data.password;
        delete data.createdAt;
        delete data.updatedAt;
        delete data.__v; // Opcional: eliminar versión de Mongoose

        // Paso 4: Responder al cliente que se registro existosamente
        res.status( 201 ).json( data );
    } 
    catch ( error ) {       
        console.error( error );

        // Error de duplicado
        if (error.code === 11000) {
            return res.status(409).json({ msg: 'No pudo registrarse por que, el usuario ya existe.' });
        }

        // Error de validación de mongoose
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Error: Campos obligatorios faltantes' });
        }

        res.status( 500 ).json({ msg: 'Error: No se pudo crear el usuario' });
    }

}

const getAllUsers = async ( req, res ) => {

    try {
        const data = await userModel.find({});
        res.status( 200 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo obtener el listado de usuarios' });
    }

}

const getUserById = async ( req, res ) => {
    const userId = req.params.id;

    try {
        const data = await userModel.findById( userId );

        // data == null --> equivale a --> ! data
        if( ! data ) {
            return res.json({ msg: 'Usuario no registrado' });
        }

        res.json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No pudo obtener el usuario por ID' });
    }

}

const updateUserById = async ( req, res ) => {
    const userId = req.params.id;
    const inputData = req.body;

    try {
        // Paso 1: Verificar si el usuario existe
        const userFound = await userModel.findOne({ 
            username: inputData.username,
            email: inputData.email
        });

        // userFound == null --> equivale a --> ! userFound
        if( ! userFound ) {
            return res.status( 404 ).json({ msg: 'El usuario que deseas actualizar no existe' });
        }

        // Paso 2: Actualizar el usuario si existe
        const data = await userModel.findByIdAndUpdate( userId, inputData, { new: true } );
        res.status( 200 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No pudo actualizar el usuario' });
    }

}

const deleteUserById = async ( req, res ) => {
    const userId = req.params.id;

    try {
        // Paso 1: Verificar si el usuario existe por ID
        const userFound = await userModel.findOne({
            _id: userId
        });

        // userFound == null --> equivale a --> ! userFound
        if( ! userFound ) {
            return res.status( 404 ).json({ msg: 'El usuario que deseas eliminar no existe' });
        }

        // Paso 2: Eliminar el usuario por ID
        const data = await userModel.findOneAndDelete({ _id: userId });

        res.status( 200 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No puede eliminar el usuario por ID' });
    }

}


// Exponiendo las funcionalidades de este archivo
export {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById
}