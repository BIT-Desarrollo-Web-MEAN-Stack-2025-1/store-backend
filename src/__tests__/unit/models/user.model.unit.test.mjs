import userModel from '../../../schemas/user.schema.mjs';

describe('Validacion directa a UserModel', () => {

    test( 'Debe lanzar error si falta el campo "name"', async () => {
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

    test( 'Debe lanzar error si falta el campo "email"', async () => {
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

    test( 'Debe lanzar error si el campo "email" es inválido', async () => {
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

    test( 'Debe lanzar error si el campo "password" tiene menos de 6 caracteres', async () => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            email: 'manuela@correo.co',     
            password: '12345',              // 👈  Contraseña con menos de 6 caracteres para provocar el error
            role: 'registered'
        });

        let error;
        try {
            await user.validate();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.password).toBeDefined();
        expect(error.errors.password.message).toBe('La contrasena debe tener al menos 6 caracteres');
    });

    test( 'Debe lanzar error si el campo "password" tiene más de 12 carácteres', async () => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            email: 'manuela@correo.co',     
            password: '123456789101112',              // 👈  Contraseña con más de 12 caracteres para provocar el error
            role: 'registered'
        });

        let error;
            
        try {
            await user.validate();
        } catch ( err ) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.errors.password).toBeDefined();
        expect(error.errors.password.message).toBe('La contrasena debe tener maxico 12 caracteres');
    });

    test( 'Debe lanzar error si el campo "role" es invalido', async () => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'invalid-role' // Rol inválido
        });

        await expect(user.validate()).rejects.toThrow();
    });

    test('Debe pasar si todos los campos son validos', async () => {
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
    
});