import userModel from '../../../schemas/user.schema.mjs';

describe('Validacion directa a UserModel', () => {
    
    // Pruebas para el campo "name" del modelo de usuario
    test( 'Debe lanzar error si falta el campo "name"', async () => {
        const user = new userModel({
            // 👈 Falta el campo 'name' para provocar el error
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

    // Pruebas para el campo "email" del modelo de usuario
    test( 'Debe lanzar error si falta el campo "email"', async () => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            // 👈 Falta el campo 'email' para provocar el error
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

    test("Debe lanzar error si el campo 'email' no es único", async () => {
        await userModel.init();         // 👈 fuerza la creación de índices, de otra manera los índices únicos se crean en segundo plano y puede que tu prueba no los pille.

        const user1 = new userModel({
            name: 'Manuela',
            username: 'Manuelita',      // 👈 Registra un 'username'
            email: 'manuela@correo.co', // 👈 Registra un 'email'
            password: '123456',
            role: 'registered'
        });
        await user1.save();

        const user2 = new userModel({
            name: 'Manuela',
            username: 'manu',           // 👈 Registra un username diferente para NO provocar el error
            email: 'manuela@correo.co', // 👈 Registra el mismo 'email' para provocar el error
            password: '123456',
            role: 'registered'
        });

        let error;
        try {
            await user2.save();
        } catch (err) {
            error = err;
        }

        // Verificamos que sea un error de duplicado
        expect(error).toBeDefined();
        expect(error).toHaveProperty('code', 11000); // Duplicate key error en Mongo
        expect(error.keyValue).toHaveProperty('email', 'manuela@correo.co');
    });

    // Pruebas para el campo "username" del modelo de usuario
    test( 'Debe lanzar error si falta el campo "username"', async () => {
        const user = new userModel({
            name: 'Manuela',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'registered'
        });

        try {
            await user.validate();
        } catch (error) {
            expect(error.errors.username).toBeDefined();
            expect(error.errors.username.message).toBe('El nombre de usuario es obligatorio.');
        }
    } );

    test( "Debe lanzar error si el campo 'username' no es único", async () => {
        await userModel.init();         // 👈 fuerza la creación de índices, de otra manera los índices únicos se crean en segundo plano y puede que tu prueba no los pille.

        const user1 = new userModel({
            name: 'Manuela',
            username: 'manu',           // 👈 Registra un 'username'
            email: 'manu@correo.co',    // 👈 Registra un 'email'
            password: '123456',
            role: 'registered'
        });
        await user1.save();

        const user2 = new userModel({
            name: 'Manuela',
            username: 'manu',           // 👈 Registra el mismo 'username' para provocar el error
            email: 'manuela@correo.co', // 👈 Registra un 'email' diferente para NO provocar el error
            password: '123456',
            role: 'registered'
        });

        let error;
        try {
            await user2.save();
        } catch (err) {
            error = err;
        }

        // Verificamos que sea un error de duplicado
        expect(error).toBeDefined();
        expect(error).toHaveProperty('code', 11000); // Duplicate key error en Mongo
        expect(error.keyValue).toHaveProperty('username', 'manu');
    });

    // Pruebas independientes para el campo "password" del modelo de usuario
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

    // Pruebas agrupadas para el campo "password" del modelo de usuario
    test.each(
        [
            { password: '12345', valido: false, mensaje: 'La contrasena debe tener al menos 6 caracteres' },            // 👈 demasiado corta
            { password: '123456789101112', valido: false, mensaje: 'La contrasena debe tener maxico 12 caracteres' },   // 👈 demasiado larga
            { password: '123456', valido: true },                                                                       // 👈 límite inferior válido
            { password: '123456789012', valido: true }                                                                  // 👈 límite superior válido
        ]
    )('Valida el password => %s', async ({ password, valido, mensaje }) => {
        const user = new userModel({
            name: 'Manuela',
            username: 'manu',
            email: 'manuela@correo.co',
            password,
            role: 'registered'
        });

        if (valido) {
            await expect(user.validate()).resolves.toBeUndefined();
        } else {
            let error;
            try {
                await user.validate();
            } catch (err) {
                error = err;
            }
            expect(error).toBeDefined();
            expect(error.errors.password).toBeDefined();
            expect(error.errors.password.message).toBe(mensaje);
        }
    });

    // Funcion para pruebas agrupadas para el campo "password" del modelo de usuario version compacta
    function validatePassword(password) {
        if (password.length < 6) {
            return 'La contraseña debe tener al menos 6 caracteres';
        }
        if (password.length > 12) {
            return 'La contraseña debe tener máximo 12 caracteres';
        }
    
        return 'OK';
    }

    // Prueba individuales para la función validatePassword
    test('password muy corto', () => {
        expect(validatePassword('12345')).toBe('La contraseña debe tener al menos 6 caracteres');
    });

    test('password muy largo', () => {
        expect(validatePassword('123456789101112')).toBe('La contraseña debe tener máximo 12 caracteres');
    });

    // Pruebas agrupadas para la función validatePassword
    test.each(
        [
            ['12345', 'La contraseña debe tener al menos 6 caracteres'],
            ['123456789101112', 'La contraseña debe tener máximo 12 caracteres']
        ]
    )
    ('password "%s" debería dar: "%s"', (password, expectedMessage) => {
        expect(validatePassword(password)).toBe(expectedMessage);
    });

    // Pruebas para el campo "role" del modelo de usuario
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

    // Pruebas para todos los campos validos del modelo de usuario
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

    // Pruebas para campos obligatorios faltantes
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