import { promedio, promedioAsync } from "../utils/notes.mjs";

describe( 'Funciones promedio() & promedioAsync() de Notas', () => {

    it( 'Debe calcular promedio si a y b pasados a promedio() son validos', () => {
        // Given
        const total = 20;
        const cantNotas = 4;

        // When
        const result = promedio( total, cantNotas );    // No necesita wrapper porque no es una función asíncrona y no lanza error
        // Then
        expect( result ).toBe( 5 );                     // Assertion 1: el resultado debe ser 5
        expect( typeof result ).toBe( 'number' );       // Assertion 2: el resultado debe ser un número
        expect( result ).toBeGreaterThan( 0 );          // Assertion 3: el resultado debe ser mayor que 0
        expect( promedio( 15, 3 ) ).toBe( 5 );          // Assertion 4: el resultado debe ser 5 para diferentes valores
        expect( promedio( 100, 10 ) ).toBe( 10 );       // Assertion 5: el resultado debe ser 10 para diferentes valores
        
        // expect( result ).toMatchSnapshot();                // Assertion 2: should match the snapshot (npm test -- -u)
    } );

    /**
     * Valida que el cociente de la división no sea negativo, pues una division por CERO, no se puede realizar
     */

    it( 'Debe lanzar error si se intenta dividir por cero', () => {
        expect( () => promedio( 20, 0 ) ).toThrow( 'No se puede dividir entre cero' );
    });

    /** 
     * Valida que el cociente de la división no sea negativo 
     */

    it('Debe lanzar error si cantNotas es negativo', () => {
        expect(() => promedio(20, -3)).toThrow('La cantidad de notas debe ser mayor a cero');
    });

    /** 
     * Valida cada uno de los casos de error de forma individual 
    */

    it('Debe lanzar error si el primer argumento no es número', () => {
        // Síncrono: el error se lanza en el momento → necesitas un wrapper () => fn().
        expect(() => promedio('20', 4)).toThrow( 'Valores invalidos' );      // Necesita wrapper, porque es una función síncrona que lanza error
        // expect( result ).toThrowErrorMatchingSnapshot();   // Assertion 2: should match the snapshot (npm test -- -u)
    });

    it( 'Debe lanza error si el segundo argumento no es un número (async)', async () => {
        // Asíncrono: el error se envuelve en una Promise rechazada → Jest lo maneja con .rejects, no necesitas wrapper.
        await expect(promedioAsync('20', 4)).rejects.toThrow('Valores invalidos'); // No necesita wrapper, porque es una función asíncrona que lanza error
        // expect( result ).toThrowErrorMatchingSnapshot();   // Assertion 2: should match the snapshot (npm test -- -u)
    });

    it('Debe lanzar error si el primer y segundo argumento no es un número (async)', async () => {
        // Asíncrono: el error se envuelve en una Promise rechazada → Jest lo maneja con .rejects, no necesitas wrapper.
        await expect( promedioAsync('20', '4')).rejects.toThrow( 'Valores invalidos' );    // Necesita wrapper, porque es una función asíncrona que lanza error
        // expect( result ).toThrowErrorMatchingSnapshot();   // Assertion 2: should match the snapshot (npm test -- -u)
    });

    // promedio('20', 4)        👉 ejecuta y rompe antes de que Jest pueda evaluar.
    // () => promedio('20', 4)  👉 retrasa la ejecución para que Jest la maneje y capture la excepción.

    /** 
     * Valida todos los casos de error de forma conjunta 
    */

    it( 'debe lanzar error cuando a y b no son validos para calcular el promedio', () => {
        // Given

        // When
        const resultOne = () => promedio( '20', 4 );        // Case with string as first argument
        const resultTwo = () => promedio( 20, '4' );        // Case with string as second argument
        const resultThree = () => promedio( '20', '4' );    // Case with strings as both arguments

        // Then
        expect( resultOne ).toThrow( 'Valores invalidos' );         // Assertion 1: should throw an error for case one
        // expect( resultOne ).toThrowErrorMatchingSnapshot();      // Assertion 2: should match the snapshot for case one

        expect( resultTwo ).toThrow( 'Valores invalidos' );         // Assertion 1: should throw an error for case two
        // expect( resultTwo ).toThrowErrorMatchingSnapshot();      // Assertion 2: should match the snapshot for case two

        expect( resultThree ).toThrow( 'Valores invalidos' );       // Assertion 1: should throw an error for case three
        // expect( resultThree ).toThrowErrorMatchingSnapshot();    // Assertion 2: should match the snapshot for case three
    } );

    /**
     *  Valida cada caso de error agrupados en la misma prueba pero de forma individual haciendo una iteracion de cada uno de los casos 
    */

    it.each([
        [ '20', 4, 'a no es número' ],
        [ 20, '4', 'b no es número' ],
        [ '20', '4', 'a y b no son números' ],
    ])(
        `Debe lanzar error (a = %s, b = %s): %s)`,
        (a, b, descripcion) => {
            expect(() => promedio(a, b)).toThrow();
        }
    );

}); 
