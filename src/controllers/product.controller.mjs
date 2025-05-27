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

    try {
        const data = await productModel.find({});
        res.json( data );        
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No se pudo obtener el listado de productos' });
    }

}

const getProductById = async ( req, res ) => {
    const productId = req.params.id;    // El nombre final dependera del nombre del parametro en la ruta

    try {
        // const data = await productModel.findById( productId );
        const data = await productModel.findOne({ _id: productId });

        // Verifica si el producto No existe y lanza el respectivo mensaje al cliente
        if( ! data ) {
            return res.json({ msg: 'El producto no se encuentra registrado' });
        }

        res.json( data );
    } 
    catch ( error ) {
        console.error( error );
        res.json({ msg: 'Error: No se pudo encontrar el producto' });
    }
    
}

// Exponer las funcionalidades para ser usadas por otros archivos
export {
    createProduct,
    getAllProducts,
    getProductById
}