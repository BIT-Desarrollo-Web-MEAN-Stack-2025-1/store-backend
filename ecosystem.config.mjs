// No usar export default { apps: [] } pm2 no interpreta las exportaciones ESM Modules adecuadamente, mejor exportarlo como constante
export const apps = [
    {
        name: 'backend',
        script: './src/index.mjs',
        node_args: '--env-file=.env',       // Garantiza la captura de las variables de entorno usando la nueva configuracion de Node 22
        // env: {
        //     PORT: 4000
        // }
    }
];

/**
 * Cuando se usa 
 *      env: {
 *          PORT: 4000
 *      }
 * se debe lanzar el comando: pm2 start ./src/index.mjs --name backend --node-args="--env-file=.env"
 * 
 * Cuando se usa 
 *      node_args: '--env-file=.env'
 * se debe lanzar el comando: pm2 start ./src/index.mjs --name backend
 * 
 * Pruebe con: curl http://localhost:4000/
 */
