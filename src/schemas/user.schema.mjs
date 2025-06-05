import mongoose from 'mongoose';

<<<<<<< HEAD
// Define la estructura del documento que se va a registrar
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [ true, 'El nombre del usuario es obligatorio'  ]      // Obligatorio
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [ true, 'El correo del usuario es obligatorio' ],
=======

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
>>>>>>> feature/authentication
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un correo electrónico válido.']
    },
    password: {
        type: String,
        trim: true,
<<<<<<< HEAD
        min: [ 6, 'La contrasena debe tener al menos 6 caracteres' ],
        max: [ 12, 'La contrasena debe tener maxico 12 caracteres' ],
        required: [ true, 'La contrasena es obligatoria' ]
    },
    role: {
        type: String,
        enum: [ 'admin', 'especialista', 'paciente' ],
        default: 'paciente'
    }
},{
    timestamps: true,           // Crea dos campos 'createdAt', 'updatedAt'
    versionKey: false           // Contador de la version del documento
});

// Definir el Modelo
const userModel = mongoose.model( 
    'users',            // Define el nombre la coleccion donde se guardaran los documentos
    userSchema
);


// Exponemos el modelo al resto de la aplicacion
=======
        required: [true, 'La contraseña es obligatoria.'],
        // minlength: [6, 'La contraseña debe tener al menos 6 caracteres.'],
        // maxlength: [12, 'La contraseña debe tener máximo 12 caracteres.'],
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
    timestamps: true, // Agrega las propiedades createdAt, updatedAt
    versionKey: false // contador __v de modificaciones del schema
});

const userModel = mongoose.model(
    'users',            // Nombre de la coleccion a la que se asocia el Schema o estructura de datos del documento
    userSchema          // Estructura de datos definida para este documento
);

>>>>>>> feature/authentication
export default userModel;