function addListOfNotes(listOfNotes) {
    if (!Array.isArray(listOfNotes)) {
        throw new TypeError('El argumento debe ser un arreglo');
    }

    let total = 0;

    for (let i = 0; i < listOfNotes.length; i++) {
        const note = listOfNotes[i];

        // Validamos que sea objeto y tenga finalNote numérico
        if (note && typeof note === 'object' && typeof note.finalNote === 'number') {
            total += note.finalNote;
        } else {
            throw new TypeError(`Elemento no válido en posición ${i}: se esperaba un objeto con finalNote numérico`);
        }
    }

    return Number(total.toFixed(2));
}

function calculateAverage ( total, numberOfNotes ) {
    if (numberOfNotes === 0) {
        return 0; // Evita división por cero
    }
    if (typeof total !== 'number' || typeof numberOfNotes !== 'number') {
        throw new TypeError('Ambos argumentos deben ser números');
    }

    return total / numberOfNotes;
}


export { 
    addListOfNotes, 
    calculateAverage 
};