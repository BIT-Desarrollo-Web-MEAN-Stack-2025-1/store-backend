import mongoose from 'mongoose';


const dbConnection = async () => {
    
    try {
        await mongoose.connect( 'mongodb://localhost:27017/db-store', {} );

        console.log( 'Base de datos inicializada exitosamente ;) ' );
    } 
    catch (error) {
        console.error( 'Error al inicializar la base datos', error );
    }

}


export default dbConnection;