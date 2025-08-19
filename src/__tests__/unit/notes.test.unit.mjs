import { addListOfNotes, calculateAverage } from "../../utils/notes.mjs";

describe( 'Note Operations', () => {
    it( 'Debe sumar una lista de notas correctamente', () => {
        const notes = [
            { name: 'Lógica', finalNote: 2.3 },
            { name: 'BackEnd', finalNote: 2.5 },
            { name: 'FrontEnd', finalNote: 3.8 },
            { name: 'Base de Datos', finalNote: 4.6 },
            { name: 'DevOps', finalNote: 3.9 }
        ];

        const total = addListOfNotes( notes );

        expect(total).toBe(17.1);               // Verifica que el resultado sea 17.1 (Fixed to 2 decimals)
        expect(typeof total).toBe('number');    // Verifica que el resultado sea un número 
        expect(total).toBeCloseTo(17.1, 5);     // 5 = cantidad de decimales de precisión
    } );

    it('Debe calcular el promedio correctamente con números válidos', () => {
        expect(calculateAverage(10, 2)).toBe(5);
        expect(calculateAverage(7.5, 3)).toBeCloseTo(2.5);
    });

    it('Debe devolver 0 si numberOfNotes es 0 (evita división por cero)', () => {
        expect(calculateAverage(10, 0)).toBe(0);
        expect(calculateAverage(0, 0)).toBe(0);
    });

    it('Debe lanzar un TypeError si los argumentos no son números', () => {
        expect(() => calculateAverage('10', 2)).toThrow(TypeError);
        expect(() => calculateAverage(10, '2')).toThrow(TypeError);
        expect(() => calculateAverage('10', '2')).toThrow(TypeError);
    });
} );    