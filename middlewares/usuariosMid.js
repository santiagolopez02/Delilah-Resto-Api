const database = require("../configuracion/database.js");
const usuarioMid ={};

usuarioMid.requiereDataRegistro = async (req, res, next)=>{
    const username = req.body.username;
    const contraseña = req.body.contraseña;
    const direccion = req.body.direccion;
    const email = req.body.email;
    const tel = req.body.telefono;

    if(typeof(username)!== "string"){
        res.status(400).json({
            message: "Hubo problemas con el username"
        })
    }else if(typeof(contraseña)!== "string"){
        res.status(400).json({
            message: "Hubo problemas con la contraseña"
        })
    }else if(typeof(direccion)!== "string"){
        res.status(400).json({
            message: "Hubo problemas con la contraseña"
        })
    }else if(typeof(email)!== "string"){
        res.status(400).json({
            message: "Hubo problemas con el email"
        })
    }else if(typeof(tel)!== "string"){
        res.status(400).json({
            message: "Hubo problemas con el telefono"
        })
    }else{
        next();
    }
}

usuarioMid.requiereDataLogin= async (req, res, next)=>{
    const username = req.body.username;
    const pass = req.body.contraseña;

    if(typeof(username)!== "string"){
        res.status(400).json({
            message:"Problemas con el usuario ingresado"
        })
    }else if(typeof(pass)!== "string"){
        res.status(400).json({
            message : "Problemas con la contraseña"
        })
    }else{
        next();
    }
}

usuarioMid.dataValida = async (req, res, next)=>{
    const nombreUsuario= req.body.username;
    const emailUsuraio = req.body.email;

    const usernameValido = await database.usuarioM.findOne({
        where : {
            username :  nombreUsuario
        }
    }).catch(err =>{
        res.status(500).json({
            message :"Error con BD",
            error : err
        })
    })
    
    const emailValido = await database.usuarioM.findOne({
        where : {
            email : emailUsuraio
        }
    }).catch(err =>{
        res.status(500).json({
            message :"Error con BD",
            error : err
        })
    })
    
    if(usernameValido){
        res.status(500).json({
            message : "El usuario ya se encuentra registrado"
        })
    }else if(emailValido){
        res.status(500).json({
            message : "El email ya se encuentra registrado"
        })
    }else{
        next();
    }
}

module.exports = usuarioMid;