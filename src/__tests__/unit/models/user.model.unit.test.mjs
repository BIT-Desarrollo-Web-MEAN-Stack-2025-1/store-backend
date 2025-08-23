import userModel from '../../../schemas/user.schema.mjs';

describe('Validacion directa a UserModel', () => {

    describe('Valida campo "name" del modelo de usuario', () => {

        it('Debe falla si "name" no es un string (type)', async () => {
        
            // Given
            const userData = {
                name: 9876543210,           // 👈 Campo 'name' con un valor que no es string
                username: 'manu',
                email: 'manuela@correo.co',
                password: '123456',
                role: 'registered'
            };

            try {
                // When
                const user = new userModel( userData );
                await user.validate();
            } catch (error) {
                // Then
                expect(error.errors.name.message).toBe( `Cast to string failed for value \"9876543210\" (type number) at path \"name\"`);
            }

        });

        it('Debe falla si "name" no se encuentra (required)', async () => {
            // expect.assertions(1);   // Aseguramos que se verifiquen una afirmacion

            // Given
            const userData = {
                // 👈 Falta el campo 'name' para provocar el error
                username: 'manu',
                email: 'manuela@correo.co',
                password: '123456',
                role: 'registered'
            };

            // When
            try {
                const user = new userModel(userData);
                await user.validate();
            } catch (error) {
                expect(error.name).toBe('ValidationError');

                expect(error.errors).toBeDefined();

                expect(typeof error.errors.name).toBe('object');

                expect(error.errors.name).toMatchObject({
                    kind: 'required',
                    path: 'name',
                    message: 'El nombre del usuario es obligatorio.',
                });

                expect(error.errors.name).toHaveProperty('kind');
                expect(error.errors.name).toHaveProperty('path');
                expect(error.errors.name).toHaveProperty('message');

                expect(error.errors.name).toMatchObject({ kind: 'required' });
                expect(error.errors.name).toMatchObject({ path: 'name' });
                expect(error.errors.name).toMatchObject({ message: 'El nombre del usuario es obligatorio.' });

                expect(error.errors.name.message).toBe('El nombre del usuario es obligatorio.');

            }
        });

        it( 'Debe eliminar espacios inicio/final de "name" (trim)', () => {
            // Given
            const userData = {
                name: ' Manuela Gomez   ',  // 👈 Campo 'name' con espacios en blanco al inicio y al final
            };

            // When
            const newUser = new userModel(userData);

            expect(newUser.name).toBe('Manuela Gomez');    // 👈 Trim aplicado

            /** NOTA:
             * trim es un setter/transformación significa que se ejecuta siempre que se asigna un valor al campo, antes incluso de validar o guardarlo en la BD 
             */

        });

        it( 'Debe aceptar "name" como un valor válido', () => {
            const user = new userModel({ name: 'Manuela Gomez' });
            expect(user.name).toBe('Manuela Gomez');
        });

    });

    describe('Valida campo "username" del modelo de usuario', () => {

        it( 'Debe fallar si "username" no es string (type)', () => {
            const user = new userModel({ username: 12345 });
            const error = user.validateSync();
            expect(error.errors.username.kind).toBe('string'); // notación correcta
        });

        it( 'Debe fallar "username" no se encuentra (required)', () => {
            // Given
            const userData = {
                name: 'Manuela',
                // 👈 Falta el campo 'username'
                email: 'manuela@correo.co',
                password: '123456',
                role: 'registered'
            };

            // When
            const user = new userModel(userData);
            const error = user.validateSync();

            // Then
            expect(error.errors.username).toBeDefined();
            expect(error.errors.username.message).toBe('El nombre de usuario es obligatorio.');
        });

        it( 'Debe fallar "username" no se encuentra (required) short-version', () => {
            const user = new userModel({});
            const error = user.validateSync();
            expect(error.errors.username.message).toBe('El nombre de usuario es obligatorio.');
        });

        it( 'Debe eliminar espacios inicio/final de "username" (trim)', () => {
            const user = new userModel({ username: '   manu   ' });
            expect(user.username).toBe('manu');
        });

        it( 'Debe transformar automáticamente "username" a minúsculas (lowercase)', () => {
            const user = new userModel({ username: 'mAnU' });
            expect(user.username).toBe('manu');
        });

        it( 'Debe aceptar "username" como un valor válido', () => {
            const user = new userModel({ username: 'manu' });
            expect(user.username).toBe('manu');
        });

    });

    describe( 'Valida campo "email" del modelo de usuario', () => {

        it( 'Debe fallar si "email" no es string (type)', () => {
            const user = new userModel({ email: 12345 });
            const error = user.validateSync();
        
            expect(error.name).toBe('ValidationError');
            expect(error.errors).toBeDefined();
            expect(error.errors.email).toBeDefined();
            expect(error.errors).toMatchObject({ email: { path: 'email' } });
            expect(error.errors.email.kind).toBe('string');
        });

        it( 'Debe fallar si "email" no se encuentra (required)', () => {
            const user = new userModel({});
            const error = user.validateSync();
        
            expect(error.name).toBe('ValidationError');
            expect(error.errors).toBeDefined();
            expect(error.errors.email).toBeDefined();
            expect(error.errors).toMatchObject({ email: { path: 'email' } });
            expect(error.errors.email.message).toBe('El correo electrónico es obligatorio.');
        });

        it( 'Debe eliminar espacios inicio/final de "email" (trim)', () => {
            const user = new userModel({ email: '   manuela@correo.co   ' });
            const error = user.validateSync();

            expect(error.name).toBe('ValidationError');

            expect(user.email).toBe('manuela@correo.co');
            expect(user.email).not.toBe('   manuela@correo.co   ');
        });

        it( 'Debe transformar automáticamente "email" a minúsculas (lowercase)', async () => {
            const user = new userModel({ email: 'ManueLa@correo.co' });
            expect(user.email).toBe('manuela@correo.co');
        });

        it( 'Debe aceptar "email" como un valor válido', () => {
            const user = new userModel({ username: 'manuela@correo.co' });
            expect(user.username).toBe('manuela@correo.co');
        });

    });

    /** Mongoose ofrece dos formas de validar documentos:
     * validate(): 
     *      Es asíncrono, devuelve una promesa. Se usa cuando quieres esperar la validación dentro de un await o callback. Internamente Mongoose lo usa, por ejemplo, cuando haces await user.save()
     *      Estamos probando reglas estáticas de schema (transformaciones y validaciones simples). No necesitas que Mongoose hable con MongoDB ni guarde nada. Querías que las pruebas fueran rápidas, sin async/await ni supertest, y que solo dependieran de Mongoose puro en memoria.
     * 
     * validateSync(): 
     *      Es síncrono, se ejecuta de inmediato. Devuelve directamente un objeto ValidationError si hay problemas, o undefined si todo está bien. Es útil en pruebas unitarias rápidas o cuando solo quieres evaluar reglas sin lidiar con await.
     *      Se ejecutan los setters/transformations (trim, lowercase, etc.) al crear la instancia. Después, puedes invocar validateSync() para que Mongoose aplique las reglas de validación (required, unique*, etc.).
     * 
     * ⚠️ Importante: 
     *      El caso de unique: true no se valida con validate() ni con validateSync(), porque esa regla depende de MongoDB creando un índice único. Solo se puede comprobar realmente al intentar guardar (user.save()). En las pruebas anteriores la ignoramos, porque no estábamos conectando a una base.
     * */
    
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

    // test( 'Debe lanzar error si el campo "password" tiene más de 12 carácteres', async () => {
    //     const user = new userModel({
    //         name: 'Manuela',
    //         username: 'manu',
    //         email: 'manuela@correo.co',     
    //         password: '123456789101112',              // 👈  Contraseña con más de 12 caracteres para provocar el error
    //         role: 'registered'
    //     });

    //     let error;
            
    //     try {
    //         await user.validate();
    //     } catch ( err ) {
    //         error = err;
    //     }

    //     expect(error).toBeDefined();
    //     expect(error.errors.password).toBeDefined();
    //     expect(error.errors.password.message).toBe('La contrasena debe tener maxico 12 caracteres');
    // });

    // Pruebas agrupadas para el campo "password" del modelo de usuario
    // test.each(
    //     [
    //         { password: '12345', valido: false, mensaje: 'La contrasena debe tener al menos 6 caracteres' },            // 👈 demasiado corta
    //         { password: '123456789101112', valido: false, mensaje: 'La contrasena debe tener maxico 12 caracteres' },   // 👈 demasiado larga
    //         { password: '123456', valido: true },                                                                       // 👈 límite inferior válido
    //         { password: '123456789012', valido: true }                                                                  // 👈 límite superior válido
    //     ]
    // )('Valida el password => %s', async ({ password, valido, mensaje }) => {
    //     const user = new userModel({
    //         name: 'Manuela',
    //         username: 'manu',
    //         email: 'manuela@correo.co',
    //         password,
    //         role: 'registered'
    //     });

    //     if (valido) {
    //         await expect(user.validate()).resolves.toBeUndefined();
    //     } else {
    //         let error;
    //         try {
    //             await user.validate();
    //         } catch (err) {
    //             error = err;
    //         }
    //         expect(error).toBeDefined();
    //         expect(error.errors.password).toBeDefined();
    //         expect(error.errors.password.message).toBe(mensaje);
    //     }
    // });

    // Funcion para desplegar un título personalizado en las pruebas agrupadas del campo "password
    function title({ password, valido }) {
        return `Password "${password}" debe ser ${valido ? 'válido' : 'inválido'}`;
    }

    // Pruebas agrupadas para el campo "password" del modelo de usuario con título personalizad
    test.each([
        { password: '123456', valido: true },
        { password: '123456789012', valido: true }
    ])(
        title,
        async ({ password, valido }) => {
            const user = new userModel({ username: 'test', email: 'test@test.com', password });
            const error = user.validateSync();

            if (valido) {
                expect(error?.errors?.password).toBeUndefined();
            } else {
                expect(error?.errors?.password?.message).toMatch(/password/i);
            }
        }
    );

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

    // Pruebas para el campo "role" del modelo de usuario asignando un rol por defecto
    test( 'debe asignar "registered" como rol por defecto si no se especifica', async () => {
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456789'
            // 👈 No especificamos el rol, debería asignarse 'registered' por defecto
        });

        await user.validate(); // valida el schema sin guardarlo

        expect(user.role).toBe('registered');
    });

    test( 'Debe asignar true por defecto si no se especifica "isActive"', async () => {
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456789',
            role: 'registered'
            // 👈 No especificamos isActive, debería asignarse true por defecto
        });

        
        expect(user.isActive).toBe(true);               // ✅ Aserción 1: valor por defecto
        expect(typeof user.isActive).toBe('boolean');   // ✅ Aserción 2: verificar que sea booleano
    });

    // Pruebas para todos los campos validos del modelo de usuario
    test(' Debe pasar si todos los campos son validos', async () => {
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