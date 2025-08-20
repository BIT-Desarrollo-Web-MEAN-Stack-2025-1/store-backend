import { sumarNotas } from "../utils/notes.mjs";

describe("Funcion sumarNotas() de Notas", () => {

    test("Debe sumar una lista de notas correctamente", () => {
        const notas = [
            { nombre: "Lógica", notaFinal: 2.3 },
            { nombre: "BackEnd", notaFinal: 2.5 },
            { nombre: "FrontEnd", notaFinal: 3.8 },
            { nombre: "Base de Datos", notaFinal: 4.6 },
            { nombre: "DevOps", notaFinal: 3.9 },
        ];

        const total = sumarNotas(notas);

        expect(total).toBe(17.1); // Verifica que el resultado sea 17.1 (Fixed to 2 decimals)
        expect(typeof total).toBe("number"); // Verifica que el resultado sea un número
        expect(total).toBeCloseTo(17.1, 5); // 5 = cantidad de decimales de precisión
    });

    test("Debe lanzar error si el argumento no es un arreglo", () => {
        expect(() => sumarNotas("no-array")).toThrow( Error );
        expect(() => sumarNotas("no-array")).toThrow( "El argumento debe ser un arreglo" );
    });

    test("Debe lanzar error si algún elemento no es un objeto válido", () => {
        const notas = [{ notaFinal: 3.5 }, null, { notaFinal: 4.0 }];
        expect(() => sumarNotas(notas)).toThrow(Error);
        expect(() => sumarNotas(notas)).toThrow("Elemento no válido en posición 1");
    });

    test("Debe lanzar error si notaFinal no es numérico", () => {
        const notas = [
            { notaFinal: "2.3" },
            { notaFinal: 2.5 },
            { notaFinal: 3.8 },
            { notaFinal: 4.6 },
            { notaFinal: 3.9 }
        ];

        expect(() => sumarNotas(notas)).toThrow(Error);
        expect(() => sumarNotas(notas)).toThrow("Elemento no válido en posición 0");
    });

    test("Debe lanzar error si notaFinal no es numérico", () => {
        const notas = [
            { notaFinal: 2.3 },
            { notaFinal: 2.5 },
            { notaFinal: 3.8 },
            { notaFinal: "4.6" },
            { notaFinal: 3.9 }
        ];

        expect(() => sumarNotas(notas)).toThrow(Error);
        expect(() => sumarNotas(notas)).toThrow("Elemento no válido en posición 3");
    });

    /** */
    const casosInvalidos = [
        { notas: [{ notaFinal: 2.3 }, { notaFinal: "oops" }, { notaFinal: 3.5 }], posicion: 1 },
        { notas: [{ notaFinal: "NaN" }, { notaFinal: 2.5 }], posicion: 0 },
        { notas: [{ notaFinal: 2.3 }, null, { notaFinal: 3.5 }], posicion: 1 },
        { notas: [{ notaFinal: 2.3 }, { notaFinal: 4.1 }, { notaFinal: "3.5" }], posicion: 2 },
    ];

    test.each( casosInvalidos )(
        `Debe lanzar error si notaFinal no es numérico (índice %s)`,
        ({ notas, posicion }) => {
            expect(() => sumarNotas(notas)).toThrow(Error);
            expect(() => sumarNotas(notas)).toThrow(
                `Elemento no válido en posición ${posicion}: se esperaba un objeto con notaFinal numérico`
            );
        }
    );

});