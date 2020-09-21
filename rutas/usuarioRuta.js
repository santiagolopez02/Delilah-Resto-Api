const expres = require("express");
const router = expres.Router();
const usuarioMid = require("../middlewares/usuariosMid");
const generalesMid = require("../middlewares/generalMid");
const usuarioControlador = require("../controladores/usuarioControler");

router.post("/login",
    generalesMid.checkBody,
    usuarioMid.requiereDataLogin,
    usuarioControlador.logIn
);
router.post("/registro",
    generalesMid.checkBody,
    usuarioMid.requiereDataRegistro,
    usuarioMid.dataValida,
    usuarioControlador.crearUsuario
)

module.exports = router;