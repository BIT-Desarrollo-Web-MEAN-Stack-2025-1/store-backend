import reviewModel from "../schemas/review.schema.mjs";

const createReview = async ( req, res ) => {
    const inputData = req.body;

    try {
        // Paso 2: Registrar el usuario
        const data = await reviewModel.create( inputData );

        // Paso 3: Responder al cliente que se registro existosamente
        res.status( 201 ).json( data );
    } 
    catch ( error ) {

        if (error.code === 11000) {
            // Error por índice único duplicado
            return res.status( 409 ).json({
                msg: "El usuario ya ha realizado una reseña para este producto.",
                fields: error.keyValue
            });
        }

        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear la reseña' });
    }

}


export {
    createReview
}