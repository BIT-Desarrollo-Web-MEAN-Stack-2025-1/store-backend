import categoryModel from "../schemas/category.schema.mjs";

const createCategory = async ( req, res ) => {
    const inputData = req.body;     // Extrae el objeto enviado

    // try: Controla las excepciones de la consulta a la base datos
    try {
        const categoryFound = await categoryModel.findOne({ name: inputData.name });

        // Verifica si la categoria YA existe y lanza el respectivo mensaje al cliente
        if( categoryFound ) {
            return res.json({ msg: 'La categoria ya se encuentra registrada' });
        }

        // Registra la categoria
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

const getCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;    // El nombre final dependera del nombre del parametro en la ruta

    try {
        // const data = await categoryModel.findById( categoryId );
        const data = await categoryModel.findOne({ _id: categoryId });

        // Verifica si la categoria No existe y lanza el respectivo mensaje al cliente
        if( ! data ) {
            return res.status( 404 ).json({ msg: 'La categoria no se encuentra registrado' });
        }

        res.status( 200 ).json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.json( 500 ).json({ msg: 'Error: No se pudo encontrar la categoria' });
    }
    
}

const removeCategoryById = async ( req, res ) => {
    const categoryId = req.params.id;

    try {
        const data = await categoryModel.findByIdAndDelete( categoryId );
        // const data = await categoryModel.findOneAndDelete({ _id: categoryId });

        // Verifica si la categoria No existe y lanza el respectivo mensaje al cliente
        if( ! data ) {
            return res.json({ msg: 'La categoria no se encuentra registrada' });
        }

        res.json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No pudo eliminar la categoria' });
    }
 
}


// Exponer las funcionalidades para ser usadas por otros archivos
export {
    createCategory,
    getAllCategories,
    getCategoryById,
    removeCategoryById
}