const database = require("../configuracion/database");
const ordenMid = {}

ordenMid.isProductAvailable = async (req, res, next) => {
    const productsArray = req.body.productsArray;
    const product = productsArray.map(product => product.id);

    res.locals.products = product;
    next();
}

ordenMid.requireDataOrden = async(req, res, next)=>{
    const metodoDePago = req.body.metodoPago;
    const arrayProduct = req.body.productsArray;

    if(typeof(metodoDePago)!=="string"){
        res.status(400).json({
            message: "Error con el tipo de dato de metodo de pago"
        });
    }else if(!Array.isArray(arrayProduct) || arrayProduct.length === 0){
        res.status(400).json({
            message: "Orden vacia"
        })
    }else{
        next();
    }
}

module.exports = ordenMid;