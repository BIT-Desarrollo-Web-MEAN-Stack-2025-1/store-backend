function sumarNotas ( lista ) {
    if (!Array.isArray(lista)) {
        throw new Error('El argumento debe ser un arreglo');
    }

    let total = 0;

    for (let i = 0; i < lista.length; i++) {
        const note = lista[i];

        // Validamos que sea objeto y tenga notaFinal numérico
        if (note && typeof note === 'object' && typeof note.notaFinal === 'number') {
            total += note.notaFinal;
        } 
        else {
            throw new Error( `Elemento no válido en posición ${i}: se esperaba un objeto con notaFinal numérico` );
        }
    }

    return Number( total.toFixed( 2 ) );
}

function promedio( total, cantNotas ) { 
    if( typeof total !== 'number' || typeof cantNotas !== 'number' ) {
        throw new Error( 'Valores invalidos' );
    }  

    if ( cantNotas === 0 ) {
        throw new Error( 'No se puede dividir entre cero' );
    }

    if ( cantNotas < 0 ) {
        throw new Error( 'La cantidad de notas debe ser mayor a cero' );
    }

    return total / cantNotas;
}

async function promedioAsync( total, cantNotas ) { 
    if( typeof total !== 'number' || typeof cantNotas !== 'number' ) {
        throw new Error( 'Valores invalidos' );
    }  

    if ( cantNotas === 0 ) {
        throw new Error( 'No se puede dividir entre cero' );
    }

    if ( cantNotas < 0 ) {
        throw new Error( 'La cantidad de notas debe ser mayor a cero' );
    }

    return total / cantNotas;
}

export { sumarNotas, promedio, promedioAsync };