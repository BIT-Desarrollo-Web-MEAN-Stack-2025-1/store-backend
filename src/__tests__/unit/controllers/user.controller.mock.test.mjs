import { expect, it, jest } from '@jest/globals';

// 1. Creamos una función mock que simula a `findById` de Mongoose.
//    En Jest, jest.fn() genera una función falsa que podemos "programar"
//    para que retorne lo que queramos (usuario válido, null, o error).
const mockFindById = jest.fn();

// 2. Con `jest.unstable_mockModule` reemplazamos el import real de `userModel`
//    por una versión mock. De esta manera, cuando el controlador intente usar
//    `userModel.findById`, en realidad estará usando nuestra función `mockFindById`.
jest.unstable_mockModule('../schemas/user.schema.mjs', () => ({
  default: { findById: mockFindById }
}));

// 3. Importamos el controlador después de haber definido el mock.
//    Es muy importante hacerlo DESPUÉS, para que Jest pueda interceptar el import
//    y reemplazar el módulo original por el mock.
const { getUserById } = await import('../../../controllers/user.controller.mjs');


describe('User Controller - getUserById (unit con mocks)', () => {
  let req, res; // simulamos objetos `req` y `res` de Express

  // 4. beforeEach se ejecuta antes de cada prueba.
  //    Aquí inicializamos el `req` y `res` de Express como mocks.
  beforeEach(() => {
    // `req.params` simula que nos pasan un ID en la URL (ej: /users/123)
    req = { params: { id: '123' } };

    // `res` es un objeto falso que tiene:
    //   - `json`: para enviar respuesta en formato JSON
    //   - `status`: simulado para que podamos encadenar `.json()`
    res = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis()
    };

    // Reiniciamos el mock de findById en cada prueba
    mockFindById.mockReset(); 
  });

    it('Debe retornar un usuario si existe', async () => {
        // Given
        const fakeUser = { _id: '1', email: 'juan@correo.co', name: 'Juan' };   // Simulamos un "usuario de mentira"
        mockFindById.mockResolvedValue(fakeUser);       // Programamos el mock: cuando alguien llame a `findById`,
                                                        //    debe resolver (promise resuelta) con `fakeUser`.
        // When
        await getUserById(req, res);                    // Ejecutamos el controlador pasando req y res simulados

        // 4. Then
        expect(mockFindById).toHaveBeenCalledWith('123');       // Assertion 1: Verificamos que el mock haya sido llamado con el ID correcto
        expect(res.json).toHaveBeenCalledWith(fakeUser);        // Assertion 2: Verificamos que la respuesta enviada sea el usuario simulado
    });

    it('Debe retornar 404 si no existe usuario', async () => {
        // Given
        mockFindById.mockResolvedValue(null);       // Programamos el mock para devolver null (como hace Mongoose cuando no encuentra nada).

        // When
        await getUserById(req, res);                // Ejecutamos el controlador

        // Then
        expect(mockFindById).toHaveBeenCalledWith('123');                           // Assertion 1: Debe haberse llamado con el ID correcto
        expect(res.status).toHaveBeenCalledWith(404);                               // Assertion 2: Debe haber retornado un status 404 (usuario no encontrado)
        expect(res.json).toHaveBeenCalledWith({ msg: 'Usuario no registrado' });    // Assertion 3:  Y el mensaje en JSON debe ser "Usuario no registrado"
    });

    it('Debe retornar 500 si ocurre una excepción', async () => {
        // Given
        mockFindById.mockRejectedValue(new Error('DB Error'));      // Programamos el mock para que lance un error (como si fallara la BD).

        // When
        await getUserById(req, res);                                // Ejecutamos el controlador

        // Then
        expect(res.status).toHaveBeenCalledWith(500);                                                   // Assertion 1: Verificamos que el controlador haya respondido con un 500
        expect(res.json).toHaveBeenCalledWith({ msg: 'Error: No pudo obtener el usuario por ID' });     // Assertion 2: Y que haya devuelto el mensaje de error esperado
    });

});