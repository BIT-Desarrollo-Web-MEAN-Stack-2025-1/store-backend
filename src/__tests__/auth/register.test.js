import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../index.mjs';
import e from 'express';


// Opción 2 — Usar una base de datos en memoria para las pruebas
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri);
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();
});

/**
 *  La filosofía de Jest (y casi todos los frameworks de testing)
 *  Pongo primero lo que obtuve realmente (received) y después lo comparo con lo que espero (expected).
 * 
 * El patrón general es:
 *      expect(received).matcher(expected)
 * 
 *  Donde:
 *     received           → el valor que obtuviste al ejecutar tu código (p. ej., res.status o el resultado de una función).
 *     matcher(expected)  → el método que indica cómo comparar y con qué valor esperado.
 */

describe('POST /api/auth/register', () => {
    const testUser = {
        name: 'Juan Carlos',
        username: 'jcarlosj',
        email: 'jcarlosj@correo.co',
        password: '123456789',
        // role: 'admin',
        // isActive: true
    };

    test( 'Registro exitoso con datos válidos', async () => {
        const res = await request( app )
            .post( '/api/auth/register' )
            .send( testUser );

        expect( res.status ).toBe( 201 );
        expect( res.body ).not.toHaveProperty( 'password' );                    // No debe devolver el password
        expect( res.body ).toHaveProperty( 'email', testUser.email );
        expect( res.body.email ).toBe( testUser.email );
    } );

    test( 'Email duplicado', async() => {
        // Registramos primero el usuario
        await request( app )
            .post( '/api/auth/register' )
            .send( testUser );

        // Intentamos registrar el mismo usuario nuevamente
        const res = await request(app)
            .post('/api/auth/register')
            .send( testUser );

        expect([400, 409]).toContain(res.status);
        // expect(res.status).toContain([400, 409]);   // ERROR
        expect(res.status === 400 || res.status === 409).toBe(true);
        expect( res.body ).toHaveProperty( 'msg', 'No pudo registrarse por que, el usuario ya existe.' );

        /**
         *  El comparador toContain es especial
         *  En toContain, el "recibido" debe ser algo que pueda contener (un array o string), no necesariamente el "resultado" directo de tu código.
         *  Por eso en tu caso queda un poco invertido:
         *  expect([400, 409]).toContain(res.status);
         *  
         *  Aquí:
         *      Recibido (received) → el array [400, 409] (algo iterable que puede "contener").
         *      Esperado (expected) → el valor res.status que quieres verificar si está dentro.
         *      Este orden no rompe la convención de Jest, porque técnicamente [400, 409] es el "recibido" en este matcher, y res.status es el valor que esperamos encontrar adentro.
         */
    } );

    test( 'Campos obligatorios faltantes', async() => {
        // Faltan los campos 'name' y 'password'
        delete testUser.name;
        delete testUser.password;
        delete testUser.role;

        const res = await request( app )
            .post( '/api/auth/register' )
            .send( testUser );

        expect( res.status ).toBe( 400 );
        expect( res.body ).toHaveProperty( 'msg', 'Error: Campos obligatorios faltantes' );
        expect( res.body.msg ).toBe( 'Error: Campos obligatorios faltantes')
    } );
    
});
