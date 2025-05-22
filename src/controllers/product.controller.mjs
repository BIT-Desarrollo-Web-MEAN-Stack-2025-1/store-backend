// Controller: Controlar el Flujo de Peticiones y Respuestas del Cliente

const createProduct = ( req, res ) => {
    const inputData = req.body; 

    console.log( inputData );

    res.send( inputData );
}


// Exponiendo las funcionalidades de este archivo usando el export
export {
    createProduct
}