const expres = require("express");
const router = expres.Router();
const ordenMid = require("../middlewares/ordenMid");
const usuarioMid = require("../middlewares/usuariosMid");
const generalesMid = require("../middlewares/generalMid");
const ordenControladores = require("../controladores/ordenControler");

router.post("/",
    generalesMid.validateToken,
    generalesMid.checkBody,
    ordenMid.requireDataOrden,
    ordenMid.isProductAvailable,
    ordenControladores.crarOrdenNueva
);
router.delete("/:id",
    generalesMid.validateToken,
    generalesMid.isAdm,
    ordenControladores.borrarOrden
);
router.get("/",
    generalesMid.validateToken,
    ordenControladores.listaDeOrdenes
);
router.put('/:id',
    generalesMid.validateToken,
    generalesMid.isAdm,
    ordenMid.validarOrderId,
    generalesMid.checkBody,
    ordenMid.requireEstado,
    ordenControladores.modificaEstado
);

module.exports= router;