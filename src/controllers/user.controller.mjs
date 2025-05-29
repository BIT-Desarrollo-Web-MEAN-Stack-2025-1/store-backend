import userModel from "../schemas/user.schema.mjs";

const createUser = async ( req, res ) => {
    const inputData = req.body;

    try {
        // Paso 1: Verificar si el usuario existe
        const userFound = await userModel.findOne({ 
            username: inputData.username,
            email: inputData.email
        });

        if( userFound ) {
            return res.status( 404 ).json({ msg: 'No pudo registrarse por que, el usuario ya existe.' });
        }

        // Paso 2: Registrar el usuario
        const data = await userModel.create( inputData );

        // Paso 3: Responder al cliente que se registro existosamente
        res.status( 201 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear el usuario' });
    }

}


// Exponiendo las funcionalidades de este archivo
export {
    createUser
}