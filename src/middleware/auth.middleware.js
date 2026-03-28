const jwt=require("jsonwebtoken");
const blacklistmodel=require("../models/blacklist.model")
const redis=require("../config/cache")
async function identifier(req,res,next){
    const token=req.cookies.jwt_token;

    const istokenblacklisted=await redis.get(token)
    if(istokenblacklisted){
        return res.status(401).json({
            messege:'invalid token'
        })
    }
    if(!token){
        return res.status(401).json({
            messege:"token not provided"
        })
    }

    let decode=null;
    try{
        decode=jwt.verify(token,process.env.WEB_TOKEN);
        req.user=decode;
        next()
    }catch(err){
        return res.status(401).json({
            messege:"invalid token"
        })
    }

}
module.exports=identifier