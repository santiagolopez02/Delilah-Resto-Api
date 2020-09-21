const jwt = require ("jsonwebtoken");
const JWTSing = "myPass";
const generalMid = {};

generalMid.checkBody = (req, res, next)=>{
    const body = req.body
    if(isObjEmpty(body)) {
        res.status(400).json({
            message: "error con la info que provee"
        })
    }else{
        next();
    }
}

generalMid.validateToken = (req, res, next)=>{
    const token =  req.headers.authorization;

    const tokenVerificado = jwt.verify(token, JWTSing,(error, decoded)=>{
        if(error){
            res.status(403).json({
                message: "problema con la verificacion del Token",
                error
            })
        }else{
            res.locals.Payload = decoded; 
            next();
        }
    })
}

generalMid.isAdm = (req, res , next)=>{
    if (res.locals.Payload.isAdm === false){
        res.status(403).json({
            message: "No es adm"
        })
    }else{
        next();
    }
}

function isObjEmpty(objeto){
    return Object.entries(objeto).length===0;
}

module.exports= generalMid;