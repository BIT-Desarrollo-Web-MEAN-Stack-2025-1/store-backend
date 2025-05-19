const express = require( 'express' );       // Importacion de dependencia usando CommonJS
const app = express();                      // Invocando la ejecucion de Express

app.listen( 3000, () => {
    console.log( 'Servidor corriendo en http://localhost:3000' );
} );