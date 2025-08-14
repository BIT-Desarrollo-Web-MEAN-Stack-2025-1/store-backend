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
});