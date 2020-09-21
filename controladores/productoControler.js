const database =  require ("../configuracion/database");
const producto = {};


producto.traerProductos = async (req, res )=>{
    const productos = await database.productoM.findAll().catch(err =>{
        res.status(500).json({
            message : "Problema con la BD"
        })
    })

    res.status(200).json({
        message : "Aca estan todos los productos",
        quantity : productos.length,
        productos
    })
}

producto.crearProducto = async (req,res)=>{
    const productoNuevo = await database.productoM.create(req.body).catch(err =>{
        res.status(500).json({
            message :"Error con la BD",
            error: err
        })
    })

    res.status(200).json({
        message: "Producto Creado",
        productoNuevo
    })
}

producto.actualizarProducto = async (req, res)=>{
    //const idProducto = req.body.id;
    const body = req.body
    const productoModificado  = await res.locals.product.update(body).catch(err =>{
        res.status(500).json({
            message :"Error con la BD",
            error: err
        })
    })

    res.status(200).json({
        message: "Producto Modificado",
        productoModificado
    })
}

producto.borrarProducto = async (req, res)=>{
    const idProducto = req.body.id;

    const productoEliminado = await database.productoM.destroy({
        where:{
            id : idProducto
        }
    }).catch(err =>{
        res.status(500).json({
            message : "Error con la BD",
            error : err
        })
    })

    res.status(200).json({
        message: "Producto eliminado",
        productoEliminado
    })

}

module.exports = producto;