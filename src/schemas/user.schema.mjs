import mongoose from 'mongoose';

// 🔴 deshabilita el casteo automático de string a nivel global (una sola vez en tu proyecto):
mongoose.Schema.Types.String.cast(false);

// Define la estructura del documento que se va a registrar
const userSchema = new mongoose.Schema({
    name: {
        type: String,       // caster: Asegura que cualquier cosa que se pueda cambiar a tipo string sea cambiado
        trim: true,         // setter/transformation: Asegura que los espacios en blanco al inicio/final sean eliminados
        required: [true, 'El nombre del usuario es obligatorio.'],      // regla de validacion:
        // validador custom: Definici[on de funcion de validacion]
        // validate: {
        //     validator: function(value) {
        //         return typeof value === 'string';
        //     },
        //     message: 'El nombre debe ser un string válido.'
        // },
        // cast: false      // 🔴 deshabilita el casteo automático de string, solo para una propiedad específica
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
        minlength: [6, 'La contrasena debe tener al menos 6 caracteres'],
        // maxlength: [ 12, 'La contrasena debe tener maxico 12 caracteres' ],
        required: [true, 'La contrasena es obligatoria']
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

// 👇 Hook para validar que `name` siempre sea string
userSchema.pre('validate', function (next) {
    if (this.name && typeof this.name !== 'string') {
        this.invalidate('name', 'El nombre debe ser un string');
    }
    next();
});

const userModel = mongoose.model(
    'users',            // Nombre de la coleccion a la que se asocia el Schema o estructura de datos del documento
    userSchema          // Estructura de datos definida para este documento
);


export default userModel;