// const express = require( 'express' );    // Importacion de dependencia usando CommonJS
import express from 'express';              // Importacion de dependencia usando ESModule

import auth from './routes/auth.router.mjs';
import product from './routes/product.route.mjs';
import category from './routes/category.route.mjs';
import user from './routes/user.route.mjs';
import review from './routes/review.route.mjs';

import dbConnection from './config/mongo.config.mjs';   // Importamos la configuracion de la base de datos

const app = express();                      // Invocando la ejecucion de Express

dbConnection();                             // Invocar la base de datos.

app.use( express.json() );                  // Habilito el interprete de Formato JSON como un Middleware de Express

// Endpoint: http://localhost:3000/
app.use( auth );        // Implementando las rutas de auth
app.use( product );     // Implementando las rutas de product
app.use( category );    // Implementando las rutas de category
app.use( user );        // Implementando las rutas de user
app.use( review );      // Implementando las rutas de review


// listen: Lanzar el servidor en http://localhost:3000
app.listen( 3000, () => {
    console.log( 'Servidor corriendo en http://localhost:3000' );
} );