import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

import app from '../../index.mjs';


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

describe('POST /api/auth/register', () => {
    test( 'Registro exitoso con datos válidos', async () => {
        const testUser = {
            name: 'Juan Carlos',
            username: 'jcarlosj',
            email: 'jcarlosj@correo.co',
            password: '123456789',
            // role: 'admin',
            // isActive: true
        };


        const res = await request( app )
            .post( '/api/auth/register' )
            .send( testUser );

        expect( res.status ).toBe( 201 );
        expect( res.body ).not.toHaveProperty( 'password' );                    // No debe devolver el password
        expect( res.body ).toHaveProperty( 'email', testUser.email );
        expect( res.body.email ).toBe( testUser.email );
    } );
    
});
