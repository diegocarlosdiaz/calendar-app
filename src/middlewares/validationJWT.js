const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {
    
    //x-token => headers

    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok: false,
            msg: "no hay token en la peticion"
        });
    }
    try{
       const payload = jwt.verify(token, process.env.SECRET_JWT);
       req.uid = payload.uid;
       req.name = payload.name;
    }

    catch (error){
        return res.status(401).json({
            ok:false,
            msg:"Token no valido"
        })
    }
  next()
}