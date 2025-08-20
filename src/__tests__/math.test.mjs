import { sum } from "../utils/math.mjs";

describe( 'Funciones de Math', () => {
    it( 'debe sumar dos numeros validos correctamente', () => {
        // Given
        const a = 5;
        const b = 3;

        // When
        const result = sum( a, b );

        // Then
        expect( result ).toBe( 8 );                       // Assertion 1: result should be 8
        expect( typeof result ).toBe( 'number' );         // Assertion 2: result should be a number
    });

    it( 'debe lanzar error cuando los valores no son validos', () => {
        // Given
        const a = '5';
        const b = 'juan';
        // When
        const result = () => sum( a, b );

        // Then
        expect( result ).toThrow( 'Valores invalidos' );  // Assertion 1: should throw an error
        // expect( result ).toThrowErrorMatchingSnapshot();   // Assertion 2: should match the snapshot
    });
} );