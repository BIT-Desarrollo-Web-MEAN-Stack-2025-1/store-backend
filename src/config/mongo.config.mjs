import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI ?? 'mongodb://localhost:27017/db-store';

// Deshabilitar el casteo automático de String en toda la app
mongoose.Schema.Types.String.cast(false);

const dbConnection = async () => {
    
    try {
        await mongoose.connect( DB_URI, {} );

        console.log( 'Base de datos inicializada exitosamente ;) ' );
    } 
    catch (error) {
        console.error( 'Error al inicializar la base datos ;( ' );
        console.error( error );
    }

}


export default dbConnection;
