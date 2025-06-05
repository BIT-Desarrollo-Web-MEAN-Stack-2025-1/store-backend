import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
        required: [true, 'La reseña debe estar asociada a un producto.']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'La reseña debe estar asociada a un usuario.']
    },
    rating: {
        type: Number,
        required: [true, 'La calificación es obligatoria.'],
        min: [1, 'La calificación mínima es 1.'],
        max: [5, 'La calificación máxima es 5.']
    },
    comment: {
        type: String,
        trim: true,
        maxlength: [500, 'El comentario no puede tener más de 500 caracteres.'],
        required: [ true, 'La reseña es obligatoria.' ]
    }
}, {
    timestamps: true,       // Agrega las propiedades createdAt, updatedAt
    versionKey: false       // contador __v de modificaciones del schema
});

// Evita que un usuario deje más de una reseña por producto
reviewSchema.index(
    // Definimos una combinacion de campos sobre los cuales se crea el indice
    { 
        // Ordena por product (ascendente), pero dentro de cada product, por user de forma ascendente.
        product: 1,     // Ordenar de forma ascendente (forma descendente -1)
        user: 1         // Ordenar de forma ascendente (forma descendente -1)
    }, 
    { unique: true }    // NO permitirá duplicados de dicha combinación
);

const reviewModel = mongoose.model(
    'reviews',          // Nombre de la coleccion a la que se asocia el Schema o estructura de datos del documento
    reviewSchema        // Estructura de datos definida para este documento
);

export default reviewModel;
