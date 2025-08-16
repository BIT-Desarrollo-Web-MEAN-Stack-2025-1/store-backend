/** Las pruebas estan enfocadas a testear el modelo de usuario con MongoDB Memory Server, para aislar y validar operaciones sin depender de la base de datos real */
import mongoose from "mongoose";
import userModel from "../../schemas/user.schema.mjs";

describe( 'Validacion a UserModel usando "MongoDB Memory Server"', () => {

    test( 'Debe crear un usuario válido', async () => {
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

    test( 'Debe dar un error si el email no tiene un formato válido', async () => {
        const userData = {
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela-correo-co',
            password: '123456',
            role: 'registered'
        };

        try {
            const user = new userModel(userData);                                       // Creamos un nuevo usuario con el modelo
            await user.save();                                                          // Intentamos guardar el usuario. Mongoose está interactuando con la base de datos que levantó mongodb-memory-server

            throw new Error('La validación debería haber fallado');                     // Si llegamos aquí, significa que la validación no falló como se esperaba
        } catch (error) {
            expect(error).toBeInstanceOf( mongoose.Error.ValidationError );             // Verificamos que el error sea una instancia de ValidationError
            expect(error.errors.email).toBeDefined();                                   // Verificamos que el error tenga un campo 'email'
            expect(error.errors.email.message).toMatch("Por favor, introduce un correo electrónico válido.");   // Verificamos que el mensaje de error sea el esperado
        }
    });

    test( 'Debe fallar si el email ya existe', async () => {
        // Insertar un usuario válido
        const userData1 = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'registered'
        });

        await userData1.save();

        // Intentar insertar otro con el mismo email
        const userData2 = new userModel({
            name: 'Manuela Gomez',
            username: 'manuelita',          // 👈 Cambiamos el username para que no choque con el anterior
            email: 'manuela@correo.co',     // 👈 Mantenemos el mismo email para provocar el error
            password: '123456',
            role: 'registered'
        });

        // Verificar que lance error
        let error;
        
        try {
            await userData2.save();
        } catch (err) {
            error = err;
        }

        expect(error).toBeDefined();
        expect(error.code).toBe(11000); // Código de error de índice único en MongoDB
        expect(error.keyPattern).toHaveProperty('email');
    });

    test( 'Debe fallar si el username ya existe', async () => {
        // 1. Crear y guardar un usuario con un username específico
        const existingUser = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'registered'
        });
        await existingUser.save();

        // 2. Intentar crear un usuario con el mismo username
        const duplicateUser = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',                   // 👈 Mantenemos el mismo username para provocar el error
            email: 'manu.gomez@correo.co',      // 👈 Cambiamos el email para que no choque con el anterior
            password: '123456',
            role: 'registered'
        });

        let error;
        try {
            await duplicateUser.save();
        } catch (err) {
            error = err;
        }

        // 3. Verificar que el error fue arrojado y que es por duplicado
        expect(error).toBeDefined();
        expect(error.name).toBe('MongoServerError');
        expect(error.code).toBe(11000);
        expect(error.keyPattern).toHaveProperty('username', 1);
    });



} );