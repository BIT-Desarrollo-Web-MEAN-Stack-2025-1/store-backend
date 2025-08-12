import mongoose from 'mongoose';

const DB_URI = process.env.DB_URI || 'mongodb://localhost:27017/db-store';

const dbConnection = async () => {

    try {
        // Si ya está conectado a la misma URI, no volver a conectar
        if (mongoose.connection.readyState === 1 && mongoose.connection.host === uriToUse) {
            return;
        }

        await mongoose.connect( DB_URI, {} );

        console.log( `[MongoDB] Conectado a: ${DB_URI} en modo ${process.env.NODE_ENV}` );
    } 
    catch (error) {
        console.error( '[MongoDB] Error al conectar' );
        console.error( error );
    }

}


/**
 * Cierra la conexión (ideal para afterAll en tests).
 */
const dbDisconnect = async () => {
    try {
        await mongoose.connection.close();
        console.log('[MongoDB] Conexión cerrada');
    } 
    catch (error) {
        console.error('[MongoDB] Error al cerrar conexión');
        console.error(error);
    }
};

export { dbConnection, dbDisconnect };
