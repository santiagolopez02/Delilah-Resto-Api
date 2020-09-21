const expres = require("express");
const router = expres.Router();
const generalesMid = require("../middlewares/generalMid");
const productoMid = require("../middlewares/productoMid");
const productoControlador = require("../controladores/productoControler");

router.get("/",
    productoControlador.traerProductos
);
router.post("/",
    generalesMid.validateToken,
    generalesMid.isAdm,
    generalesMid.checkBody,
    productoMid.requiereDataProd,
    productoControlador.crearProducto
);
router.delete("/:id",
    generalesMid.validateToken,
    generalesMid.isAdm,
    productoControlador.borrarProducto
);
router.put("/:id",
    generalesMid.validateToken,
    generalesMid.isAdm,
    productoMid.validateProductId,
    generalesMid.checkBody,
    productoMid.requiereDataProd,
    productoControlador.actualizarProducto
);

module.exports= router;