const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require("../Config/db")

const authentication = (req,res,next) => {
    if(!req.headers.authorization){
        return res.send({msg:"please login again"})
    }
    const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token, JWT_SECRET, function(err,decoded){
        if(err){
            res.send({msg:"Please login"})
        }
        else{
            req.body.userId = decoded.userId
            next()
        }
    });
}

module.exports = {
    authentication
}