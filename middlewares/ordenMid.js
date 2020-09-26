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
ordenMid.validarOrderId = async (req, res, next) => {
    const orden = await database.orderM.findByPk(req.params.id);
    
    if(orden) {
        res.locals.order = orden.id;
        next();
    } else {
        res.status(404).json({
            message: 'La orden no existe'
        });
    }
};
ordenMid.requireEstado = (req, res, next) => {
    const estado = req.body.estado;

    if(typeof(estado) !== 'string') {
        res.status(400).json({
            message: 'Problema con la info del estado'
        });
    } else {
        next();
    }
};

module.exports = ordenMid;