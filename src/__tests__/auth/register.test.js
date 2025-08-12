import request from 'supertest';
import app from '../../index.mjs';
import userModel from '../../schemas/user.schema.mjs';

// Opción 1 — Limpiar la colección antes de cada test
beforeEach(async () => {
    await userModel.deleteMany({});
    /**
     * Sí afecta los datos reales si tu conexión en las pruebas apunta a tu base de datos de desarrollo o producción.
     * Esto borrará todos los documentos de la colección users cada vez que corras las pruebas.
     * Solo sería seguro si tu MONGO_URI en el entorno de test apunta a una base de datos exclusiva para pruebas, como myapp_test.
     */
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
