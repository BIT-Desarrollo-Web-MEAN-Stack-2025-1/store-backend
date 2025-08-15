import { expect, jest, test } from '@jest/globals';
import userModel from '../../schemas/user.schema.mjs'; // Importa el modelo de usuario


describe('Validacion directa de UserSchema', () => {
    test( 'Debe fallar si falta el campo "name"', async () => {
        const user = new userModel({
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'registered'
        });

        try {
            await user.validate();
        } catch (error) {
            expect(error.errors.name).toBeDefined();
            expect(error.errors.name.message).toBe('El nombre del usuario es obligatorio.');
        }
    });

    test( 'Debe fallar si falta el campo "email"', async () => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            password: '123456',
            role: 'registered'
        });

        try {
            await user.validate();
        } catch (error) {
            expect(error.errors.email).toBeDefined();
            expect(error.errors.email.message).toBe('El correo electrónico es obligatorio.');
        }
    } );
    
    test( 'Debe fallar si el campo "email" es inválido', async () => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            email: 'manuela@correo.co', // Email inválido
            password: '123456',
            role: 'registered'
        });

        try {
            await user.validate();
        } catch (error) {
            expect(error.errors.email).toBeDefined();
            expect(error.errors.email.message).toBe('Por favor, introduce un correo electrónico válido.');
        }
    });

    test( 'Deberia fallar si el campo "role" es invalido', async () => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'invalid-role' // Rol inválido
        });

        await expect(user.validate()).rejects.toThrow();
    });

    test('Debe validar correctamente si todos los campos son correctos', async () => {
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'registered'
        });

        // Si no lanza error, la prueba pasa
        await expect(user.validate()).resolves.toBeUndefined();
    });

    test('Debe lanzar error si faltan campos obligatorios', async () => {
        // Creamos un usuario con datos incompletos (faltan email y password)
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            role: 'registered'
        });

        let error;
        
        try {
            await user.save();      // Intentamos guardar el usuario. Mongoose está interactuando con la base de datos que levantó mongodb-memory-server
        } catch ( err ) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors).toBeDefined();
        expect(error.name).toBe('ValidationError');
    
        // Verificamos que los campos faltantes estén en el error
        expect(error.errors).toHaveProperty('email');
        expect(error.errors).toHaveProperty('password');
    });

    test('Debe crear un usuario válido (mongodb-memory-server)', async () => {
        // Creamos un usuario que cumple todas las validaciones
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'registered'
        });

        // Guardamos en Mongo en memoria
        const savedUser = await user.save();    // Intentamos guardar el usuario. Mongoose está interactuando con la base de datos que levantó mongodb-memory-server

        // Validaciones
        expect(savedUser).toBeDefined();
        expect(savedUser._id).toBeDefined();
        expect(savedUser.name).toBe('Manuela Gomez');
        expect(savedUser.username).toBe('manu');
        expect(savedUser.email).toBe('manuela@correo.co');
        expect(savedUser.role).toBe('registered');
    });
});