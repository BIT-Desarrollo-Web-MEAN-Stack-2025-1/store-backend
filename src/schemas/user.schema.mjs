import mongoose from 'mongoose';

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
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Por favor, introduce un correo electrónico válido.']
    },
    password: {
        type: String,
        trim: true,
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
export default userModel;