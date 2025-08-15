/**
 * Configuración de Jest para pruebas unitarias con MongoDB en memoria.
 * La dependencia mongodb-memory-server, arranca un servidor MongoDB falso en tu máquina, pero no escribe nada en disco.
 * Esto es útil para pruebas unitarias porque:
 * - No necesitas una base de datos real para probar tu código.
 * - Puedes ejecutar pruebas en paralelo sin preocuparte por conflictos de datos.
 * - Es rápido y fácil de configurar.
 * - Todo se ejecuta en memoria RAM, lo que hace que las pruebas sean más rápidas y eficientes.
 * - La base de datos en memoria se crea antes de que se ejecuten los tests y se limpia después de cada test.
 */
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { jest } from '@jest/globals';

// Variable para almacenar la instancia del servidor en memoria
let mongoServer;

// Hook de Jest que se ejecuta una vez antes de todos los tests.
beforeAll(async () => {
  // Aumentamos el timeout porque iniciar Mongo puede tardar un poco
  jest.setTimeout(30000);   // Aumenta el tiempo máximo que Jest espera antes de dar por fallado un test (30 segundos aquí), útil porque levantar MongoDB puede tardar

  // Iniciamos MongoDB en memoria
  mongoServer = await MongoMemoryServer.create();   // Crea una instancia del servidor MongoDB en memoria. Levanta una instancia de Mongo en memoria.
  const uri = mongoServer.getUri();                 // Obtenemos la URI de conexión para Mongoose. Devuelve la URI de conexión para esa instancia (parecida a mongodb://127.0.0.1:XXXXX/dbname).

  // Conectamos Mongoose al Mongo en memoria. Conecta Mongoose a ese Mongo en memoria, como si fuera un servidor real.
  await mongoose.connect(uri, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  });
});

// Hook de Jest que se ejecuta después de cada test. Hook que se ejecuta después de cada test individual.
afterEach(async () => {
  // Limpiamos las colecciones después de cada test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany();    // Elimina todos los documentos de cada colección para asegurar que cada test empieza con una base de datos limpia.
  }
});

// Hook de Jest que se ejecuta una vez después de todos los tests. Hook que se ejecuta una vez después de que todos los tests hayan terminado
afterAll(async () => {
  // Cerramos la conexión y detenemos el servidor
  await mongoose.connection.dropDatabase();   // Elimina la base de datos para limpiar todo. Borra toda la base de datos.
  await mongoose.connection.close();          // Cierra la conexión de Mongoose.  Cierra la conexión de Mongoose con el servidor Mongo en memoria.
  await mongoServer.stop();                   // Detiene el servidor Mongo en memoria. Detiene el servidor Mongo en memoria.      

});
