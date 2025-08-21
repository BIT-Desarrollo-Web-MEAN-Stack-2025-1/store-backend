/** Las pruebas estan enfocadas a testear el modelo de usuario con MongoDB Memory Server, para aislar y validar operaciones sin depender de la base de datos real */
import mongoose from "mongoose";
import userModel from "../../schemas/user.schema.mjs";

describe('Validacion a UserModel usando "MongoDB Memory Server"', () => {

    it("Debe lanzar error si falta el campo 'name'", async () => {
        // expect.assertions(2);   // Aseguramos que se verifiquen dos afirmaciones

        try {
            const user = new userModel({
                // 👈 Falta el campo 'name' para provocar el error
                username: 'manu',
                email: 'manuela-correo-co',
                password: '123456',
                role: 'registered'
            });

            await user.save();
        } catch (error) {
            expect(error.name).toBe('ValidationError');             // 1er. afirmación. // Verifica que sea un ValidationError
            expect(error.errors).toHaveProperty('name');            // 2da. afirmación. erifica que el campo 'name' sea reportado
            // expect(error.errors.name.msg).toBe('El campo "name" es obligatorio.'); // Verifica el mensaje de error  
            // expect(error.errors.name.msg).toMatch(/El campo "name" es obligatorio./); // Verifica que el mensaje de error sea el esperado
            expect(error.errors.name.kind).toBe('required');        // Verifica que el tipo de error sea 'required'
            expect(error.errors.name.path).toBe('name');            // Verifica que el campo afectado sea 'name'
            expect(error.errors.name.value).toBeUndefined();        // Verifica que el valor del campo 'name' sea undefined    
        }
    });

    it('Debe dar un error si el email no tiene un formato válido', async () => {
        const userData = {
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela-correo-co',     // 👈 'email' tiene un formato no valido, para provocar el error
            password: '123456',
            role: 'registered'
        };

        try {
            const user = new userModel(userData);                                       // Creamos un nuevo usuario con el modelo
            await user.save();                                                          // Intentamos guardar el usuario. Mongoose está interactuando con la base de datos que levantó mongodb-memory-server

            throw new Error('La validación debería haber fallado');                     // Si llegamos aquí, significa que la validación no falló como se esperaba
        } catch (error) {
            expect(error).toBeInstanceOf(mongoose.Error.ValidationError);             // Verificamos que el error sea una instancia de ValidationError
            expect(error.errors.email).toBeDefined();                                   // Verificamos que el error tenga un campo 'email'
            expect(error.errors.email.message).toMatch("Por favor, introduce un correo electrónico válido.");   // Verificamos que el mensaje de error sea el esperado
        }
    });

    it("Debe lanzar error si el campo 'email' no es único", async () => {
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

    it('Debe crear un usuario válido', async () => {
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

    it("Debe lanzar error si el campo 'username' no es único", async () => {
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

    // Pruebas para el campo "role" del modelo de usuario permitiendo los roles válidos
    it.each([
        'super-admin',
        'admin',
        'colaborator',
        'registered',
    ])('debe aceptar el rol permitido "%s"', async (validRole) => {
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: `${validRole}@correo.co`,
            password: '123456789',
            role: validRole,
        });

        const savedUser = await user.save();

        expect(savedUser.role).toBe(validRole);
    });

    it('Debe fallar si el username ya existe', async () => {
        // 1. Crear y guardar un usuario con un username específico
        const existingUser = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',                   // 👈 Registra un 'username'
            email: 'manuela@correo.co',         // 👈 Registra un 'email'
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

    // Pruebas para timestamps (createdAt, updatedAt)
    it('Debe tener timestamps (createdAt, updatedAt)', async () => {
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            email: 'manuela@correo.co',
            password: '123456',
            role: 'registered'
        });

        await user.save();

        expect(user).toHaveProperty('createdAt'); // ✅  Aserción 1: Verifica timestamp
        expect(user).toHaveProperty('updatedAt'); // ✅  Aserción 2: Verifica timestamp
    });

    // Pruebas para campos obligatorios faltantes
    it('Debe lanzar error si faltan campos obligatorios', async () => {
        // Creamos un usuario con datos incompletos (faltan email y password)
        const user = new userModel({
            name: 'Manuela Gomez',
            username: 'manu',
            role: 'registered'
        });

        let error;

        try {
            await user.save();      // Intentamos guardar el usuario. Mongoose está interactuando con la base de datos que levantó mongodb-memory-server
        } catch (err) {
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