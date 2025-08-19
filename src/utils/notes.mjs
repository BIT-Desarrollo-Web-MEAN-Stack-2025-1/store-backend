function addListOfNotes(listOfNotes) {
    let total = 0;

    for (let i = 0; i < listOfNotes.length; i++) {
        const note = listOfNotes[i];

        // Validamos que el elemento sea un objeto y tenga una finalNote numérica
        if (note && typeof note === 'object' && typeof note.finalNote === 'number') {
            total += note.finalNote;
        } else {
            console.warn(`Elemento no válido encontrado en posición ${i}:`, note);
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