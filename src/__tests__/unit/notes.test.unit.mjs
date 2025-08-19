import e from "cors";
import { addListOfNotes } from "../../utils/notes.mjs";

describe( 'Note Operations', () => {
    it( 'Add List of Notes correctly', () => {
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
} );    