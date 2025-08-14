import { expect, jest, test } from '@jest/globals';
import userModel from '../../schemas/user.schema.mjs'; // Importa el modelo de usuario

describe('Validaciones de UserSchema', () => {
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
});