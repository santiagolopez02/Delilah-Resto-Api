const database = require("../configuracion/database");
const orden = {}

orden.crarOrdenNueva = async (req, res)=>{
    const loggerUser = res.locals.Payload;
    const dbProducto =  res.locals.products;
    
    const nuevaOrden = {
        metodoPago :req.body.metodoPago,
        total:  calculaTotal(dbProducto, req.body.productsArray),
        userId: loggerUser.id   
    }

    const nuevaOrdenBD = await database.orderM.create(nuevaOrden).catch(err =>{
        res.status(500).json({
            message : "Error con la BD",
            error : err
        })
    })
    
    //crea array para mandar a la tabla Pedidoorden mediante el metodo bulkCreate();
    const ordenID = nuevaOrdenBD.id;
    console.log(ordenID + " eSTE ES EL ORDEN ID")
    const arrayProductosPedidos =  crearArrayProductosEnOrden(ordenID, dbProducto, req.body.productsArray );
    console.log(arrayProductosPedidos[0].productoId + " eSTE ES EL ORDEN ID")
    const arrayParaProductoOrden = await database.productoOrdenM.bulkCreate(arrayProductosPedidos)
    .catch(async err =>{
        await database.orderM.destroy({
            where: {
                id: ordenID
            }
        }).catch(error =>{
            res.status(500).json({
                message: "Producto no instertado, orden eliminada de BD"
            })
        })
    })

    res.status(200).json({
        message: "La orden fue creada con exito",
        arrayParaProductoOrden,
        nuevaOrden
    })
}

orden.listaDeOrdenes = async(req, res)=>{
    if(res.locals.Payload.isAdm){
        const ordenes = await database.orderM.findAll().catch(err=>{
            res.status(500).json({
                message: "Error con la base de datos",
                error: err
            })
        })
        res.status(200).json({
            message: "Lista de ordenes",
            ordenes
        })
    }else{
        const ordenesSegunUsuario = await database.orderM.findAll({
            where : {userId : res.locals.Payload.id}
        }).catch(err =>{
            res.status(500).json({
                message :"Error con la base de datos"
            })
        })
        res.status(200).json({
            message : "Lista de ordenes segun usuario",
            ordenesSegunUsuario
        })
    }
}

orden.borrarOrden = async(req, res)=>{
    const ordenEliminada = await database.orderM.destroy({
        where : {
            id : req.body.id
        }
    }).catch(err =>{
        res.status(500).json({
            message :"Error con la base de datos"
        })
    })

    res.status(200).json({
        message : "La orden fue eliminada con exito",
        ordenEliminada
    })
}

orden.modificaEstado = async (req, res) => {
    const estadoNuevo = req.body.estado;
    

    const updatedOrder = await database.orderM
    .update({ estado: estadoNuevo }, { where: { id: req.params.id } })
    .catch(err => catchDatabaseEror(err, res));

    res.status(200).json({
        message: 'Orden actualizada.'
    });
};

//Funciones auxialiares para calcular el total del precio de la orden y para captar el array de productos que van en la orden

function calculaTotal(arrayPBD, arrayPUsuarios){
    let total = 0;

    arrayPUsuarios.forEach(arrayPUsuario=>{      
      productoFiltrado =  arrayPBD.find(productoBD => arrayPUsuario.id === productoBD);
      total = total + arrayPUsuario.precio * arrayPUsuario.cantidad;
    });

    return total;
}

function crearArrayProductosEnOrden (ordenid , arrayPBD, arrayPUsuario){
    const arrayProductoOrden = [];

    for (let i = 0; i < arrayPUsuario.length; i++){
        const productoUsuario = arrayPUsuario[i];
        const productoFiltrado =   arrayPBD.find(productoBD => productoUsuario.id === productoBD);
        console.log("id orden y producto dentro de la func"+ productoFiltrado)
        const producto ={
            cantidad: productoUsuario.cantidad,
            subtotal: productoUsuario.cantidad * productoUsuario.precio,
            ordenId : ordenid,
            productoId: productoFiltrado
        }
        arrayProductoOrden[i] = producto;
    };
    return arrayProductoOrden;
}

module.exports = orden;