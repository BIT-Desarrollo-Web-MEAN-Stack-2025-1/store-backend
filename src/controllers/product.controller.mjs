import productModel from "../schemas/product.schema.mjs";

const createProduct = async ( req, res ) => {
    const inputData = req.body;     // Estraigo el objeto enviado

    // try: Controla las excepciones de la consulta a la base datos
    try {
        const registeredProduct = await productModel.create( inputData );

        console.log( registeredProduct );        // Imprime en la consula
        res.status( 201 ).json( registeredProduct );           // Enviando la respuesta al cliente
    } 
    catch (error) { // Catch: Captura el error producido por la excepcion
        console.error( error );
        res.status( 500 ).json({ msg: 'Error: No se pudo registrar el producto' });
    }

}

const getAllProducts = async ( req, res ) => {
    const data = await productModel.find({});
    res.json( data );
}

// Exponer las funcionalidades para ser usadas por otros archivos
export {
    createProduct,
    getAllProducts
}