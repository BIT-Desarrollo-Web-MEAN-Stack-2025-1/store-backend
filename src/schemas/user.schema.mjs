import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true, // Asegura que los espacios en blanco al inicio/final sean eliminados
        required: [true, 'El nombre del usuario es obligatorio.']
    },
    username: {
        type: String,
        lowercase: true,
        required: [true, 'El nombre de usuario es obligatorio.'],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es obligatorio.'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un correo electrónico válido.']
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'La contraseña es obligatoria.'],
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'],
        maxlength: [12, 'La contraseña debe tener máximo 12 caracteres.'],
    },
    role: {
        type: String,
        required: [true, 'El rol del usuario es obligatorio.'],
        enum: {
            values: ['super-admin', 'admin', 'colaborator', 'registered'],
            message: 'El rol {VALUE} no es válido. Los roles permitidos son: super administrador, administrador, colaborador, usuario registrado.'
        },
        default: 'registered' // Cambiado a 'registrado' para mayor coherencia con los roles definidos
    },
    isActive: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true, // Agrega las propiedades createdAt
    versionKey: false // contador __v de modificaciones del schema
});

const userModel = mongoose.model(
    'users',            // Nombre de la coleccion a la que se asocia el Schema o estructura de datos del documento
    userSchema          // Estructura de datos definida para este documento
);

export default userModel;