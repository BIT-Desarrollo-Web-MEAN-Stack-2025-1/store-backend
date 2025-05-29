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

const deleteReviewById = async ( req, res ) => {
    const reviewId = req.params.id;

    try {
        const data = await reviewModel.findByIdAndDelete( reviewId );

        // data == null --> equivale a --> ! data
        if( ! data ) {
            return res.status( 404 ).json({ msg: 'La reseña no existe' });
        }

        res.status( 200 ).json({ msg: 'Reseña eliminada correctamente', data });
    } 
    catch ( error ) {
        console.error( error );

        // Si el ID no es válido (no es un ObjectId), responde con 400
        if ( error.name === 'CastError' && error.kind === 'ObjectId' ) {
            return res.status( 400 ).json({ msg: 'ID de reseña no válido' });
        }

        res.status( 500 ).json({ msg: 'Error: No pudo eliminar la reseña por ID' });
    }

}

const updateReviewById = async (req, res) => {
    const reviewId = req.params.id;
    const updates = req.body;

    try {
        const updated = await reviewModel.findByIdAndUpdate(
            reviewId,
            updates,
            { 
                new: true,              // new: Retorna el documento actualizado
                runValidators: true     // runValidators: Fuerza a Mongoose a validar los datos actualizados (muy importante si el usuario edita campos como rating)
            }  
        );

        if ( ! updated ) {
            return res.status( 404 ).json({ msg: 'La reseña no existe' });
        }

        res.status(200).json({ msg: 'Reseña actualizada correctamente', data: updated });
    } catch (error) {
        console.error(error);

        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status( 400 ).json({ msg: 'ID de reseña no válido' });
        }

        // Errores de validación: verifica que el error sea específicamente por una violación de las reglas del esquema.
        if ( error.name === 'ValidationError' ) {
            return res.status( 400 ).json({ msg: 'Error de validación', errors: error.errors });    // error.errors: objeto detallado que contiene los errores por campo
        }

        res.status( 500 ).json({ msg: 'Error: No se pudo actualizar la reseña' });
    }
};



export {
    createReview,
    getReviewById,
    deleteReviewById,
    updateReviewById
}