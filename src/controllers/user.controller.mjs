import userModel from "../schemas/user.schema.mjs"

const createUser = async ( req, res ) => {
    const inputData = req.body;

    const data = await userModel.create( inputData );
    res.status( 201 ).json( data );
}


// Exponer cada funcionalidad definida en este archivo
export {
    createUser
}

