import mongoose from 'mongoose';

// Define el Schema (Estructura de archivos)
const productSchema = new mongoose.Schema(
    // Define la estructura de datos del documento
    {
        name: {
            type: String,
            trim: true,
            required: [ true, 'El nombre del producto es requerido' ]
        },
        description: {
            type: String,
            trim: true
        },
        price: {
            type: Number,
            trim: true,
            min: [ 0, 'El precio del producto debe ser mayor a cero' ],
            default: 0
        },
        stock: {
            type: Number,
            trim: true,
            min: [ 1, 'El stock minimo para registrar es 1' ],
            default: 1
        },
        category: {
            // TODO: Vincular con un Id al CategorySchema
            type: String,
            default: 'non-category'
        },
        urlImage: {
            type: String,
            trim: true
        },
        state: {
            type: Boolean,
            default: true
        },
        // owner: {
            // TODO: Vincular con un Id al UserSchema
        // }
    },
    // Configuracion de la estructura de datos
    {
        timestamps: true,       // Agrega las propiedades createdAt, updatedAt (Fechas de Creacion y Actualizacion del documento)
        versionKey: false       // Eliminar la propiedad __v (Contador de modificaciones del Schema)
    });

// Define el Modelo: Vincular el Schema a una collection especifica
const productModel = mongoose.model( 
    'products',                 // Nombre de la collection a la que lo voy a asociar
    productSchema               // La estructura de datos a la que lo vamos a vincular
);


// Exponemos el Modelo para ser usado por cualquier otro archivo en mi aplicacion
export default productModel;
