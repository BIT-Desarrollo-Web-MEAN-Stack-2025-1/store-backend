// const express = require( 'express' );    // Importacion de dependencia usando CommonJS
import express from 'express';              // Importacion de dependencia usando ESModule
const app = express();                      // Invocando la ejecucion de Express

// Endpoint: http://localhost:3000/
app.get( '/', ( req, res ) => {
    res.send( '<h1>Home</h1>' );
} );
app.get( '/about-us', ( req, res ) => {
    res.send( '<h1>About us</h1>' );
} );
app.get( '/contact', ( req, res ) => {
    res.send( '<h1>Contact</h1>' );
} );

// listen: Lanzar el servidor en http://localhost:3000
app.listen( 3000, () => {
    console.log( 'Servidor corriendo en http://localhost:3000' );
} );