import categoryModel from "../schemas/category.schema.mjs";

const createCategory = async ( req, res ) => {
    const inputData = req.body;     // Extrae el objeto enviado

    // try: Controla las excepciones de la consulta a la base datos
    try {
        const registeredCategory = await categoryModel.create( inputData );

        console.log( registeredCategory );                      // Imprime en la consula
        res.status( 201 ).json( registeredCategory );           // Enviando la respuesta al cliente
    } 
    catch (error) { // Catch: Captura el error producido por la excepcion
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo registrar la categoria' });
    }

}

const getAllCategories = async ( req, res ) => {

    try {
        const data = await categoryModel.find({});
        res.status( 200 ).json( data );        
    } 
    catch ( error ) {
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo obtener el listado de categorias' });
    }

}


// Exponer las funcionalidades para ser usadas por otros archivos
export {
    createCategory,
    getAllCategories
}