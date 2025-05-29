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

        // Valida Error por índice único duplicado
        if ( error.code === 11000 ) {
            return res.status( 409 ).json({
                msg: "El usuario ya ha realizado una reseña para este producto.",
                fields: error.keyValue
            });
        }

        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo crear la reseña' });
    }

}

const getReviewById = async ( req, res ) => {
    const reviewId = req.params.id;

    try {
        const data = await reviewModel.findById( reviewId );

        // data == null --> equivale a --> ! data
        if( ! data ) {
            return res.json({ msg: 'La reseña no existe' });
        }

        res.json( data );
    } 
    catch ( error ) {
        console.error( error );

        // Si el ID no es válido (no es un ObjectId), responde con 400
        if ( error.name === 'CastError' && error.kind === 'ObjectId' ) {
            return res.status( 400 ).json({ msg: 'ID de reseña no válido' });
        }

        res.json({ msg: 'Error: No pudo obtener la reseña por ID' });
    }

}


export {
    createReview,
    getReviewById
}