const jwt=require("jsonwebtoken")

require("dotenv").config()

const authenticate=(req,res,next)=>{
    const token=req.headers.authorization
    if(token){
        jwt.verify(token,process.env.secret_key,(err,decoded)=>{
            if(decoded){
                console.log(decoded)
                req.body.user=decoded.userId
                next()
            }else{
                res.send({"msg":"Please Login"})
            }
        })
    }else{
        res.send({"msg":"Please Login"})
    }
}

module.exports={
    authenticate
}
