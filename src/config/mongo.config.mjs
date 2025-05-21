import mongoose from 'mongoose';

// Define una funcion asincrona para definir la configuracion del ODM Mongoose para usar MongoDB

/** Configuracion para conectar MongoDB usando la dependencia MongooseJS usando Async/Await */
async function dbConection() {
    // try-catch: Se usa para manejar excepciones
    try {
        await mongoose.connect( 'mongodb://localhost:27017/db-fonefo' );      // Conectamos a la base de datos y retorna promesa
        console.log( 'Base de datos inicializada correctamente' );
    } 
    catch ( error ) {
        console.error( error );
        console.log( 'Ha ocurrido un error en la conexion de la BD' );
        // throw new Error( 'Error al inicializar la base datos' );
    }
    
}

export default dbConection;