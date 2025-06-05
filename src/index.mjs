// const express = require( 'express' );    // Importacion de dependencia usando CommonJS
import express from 'express';              // Importacion de dependencia usando ESModule

import product from './routes/product.route.mjs';
import category from './routes/category.route.mjs';
import user from './routes/user.route.mjs';
import auth from './routes/auth.router.mjs';

import dbConnection from './config/mongo.config.mjs';   // Importamos la configuracion de la base de datos

const app = express();                      // Invocando la ejecucion de Express

dbConnection();                             // Invocar la base de datos.

app.use( express.json() );                  // Habilito el interprete de Formato JSON como un Middleware de Express

// Endpoint: http://localhost:3000/

app.use( product );                         // Implementando las rutas de producto
app.use( category );                        // Implementando las rutas de categoria
app.use( user );        // Vicular las rutas para la entidad User
app.use( auth );        // Vincula las rutas para la entidad Auth


// listen: Lanzar el servidor en http://localhost:3000
app.listen( 3000, () => {
    console.log( 'Servidor corriendo en http://localhost:3000' );
} );