// const express = require( 'express' );    // Importacion de dependencia usando CommonJS
import express from 'express';              // Importacion de dependencia usando ESModule

import product from './routes/product.route.mjs';       // Importamos las rutas de la entidad producto
import user from './routes/user.route.mjs';             // Importamos las rutas de la entidad usuario
import dbConnection from './config/mongo.config.mjs';   // Importamos la configuracion de la base de datos

const app = express();                      // Invocando la ejecucion de Express

dbConnection();                             // Invocar la base de datos.

app.use( express.json() );                  // Habilito el interprete de Formato JSON como un Middleware de Express

// Endpoint: http://localhost:3000/
app.use( product );                         // Implementar la ruta como un Middleware de Express
app.use( user );                            // Implementar la ruta como un Middleware de Express

// listen: Lanzar el servidor en http://localhost:3000
app.listen( 3000, () => {
    console.log( 'Servidor corriendo en http://localhost:3000' );
} );