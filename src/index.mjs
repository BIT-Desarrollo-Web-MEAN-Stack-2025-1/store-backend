// const express = require( 'express' );    // Importacion de dependencia usando CommonJS
import express from 'express';              // Importacion de dependencia usando ESModule
import product from './routes/product.route.mjs';       // Importamos las rutas de la entidad producto
import user from './routes/user.route.mjs';             // 
import dbConection from './config/mongo.config.mjs';    // Importamos la conexion a la base de datos

const app = express();                      // Invocando la ejecucion de Express

// Invocar la configuracion de la conexion a la base de datos
dbConection();

// Endpoint: http://localhost:3000/
app.use( product );                         // Implementar la ruta como un Middleware de Express
app.use( user );

// listen: Lanzar el servidor en http://localhost:3000
app.listen( 3000, () => {
    console.log( 'Servidor corriendo en http://localhost:3000' );
} );