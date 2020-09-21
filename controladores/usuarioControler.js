const jwt = require("jsonwebtoken");
const JWTSing = "myPass";
const database = require("../configuracion/database");
const usuario = {}


usuario.logIn = async (req, res) =>{
    //comprobar si los parametro username y contraseña provienen de la BD o del body en el post
    const userName = req.body.username;
    const pass = req.body.contraseña;

    const usuarioLog = await database.usuarioM.findOne({
        where:{
            username : userName,
            contraseña : pass
        }
    }).catch(err =>{
        res.status(500).json({
            message: "Problema con la BD",
            error : err
        })
    })
     
    if(!usuarioLog){
        res.status(404).json({
            message : "El usuario o contraseña es invalido"
        })
    }else{
        res.locals.userPayload = usuarioLog;
        const token = jwt.sign({
            id: usuarioLog.id,
            username: usuarioLog.username,
            isAdm : usuarioLog.isAdm

        }, JWTSing );

        res.status(200).json({
            message : "Usuario logueado",
            token
        })

    }

}

usuario.crearUsuario = async (req, res)=>{
    const body = req.body;
    
    const usuraioNuevo = await database.usuarioM.create(body)
    .catch(err =>{
        res.status(500).json({
            message : "Error con la BD",
            error : err
        })
    })

    res.status(201).json({
        message : "El usuario se creo con exito",
        usuraioNuevo
    })

}

module.exports = usuario;