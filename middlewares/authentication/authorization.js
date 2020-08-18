const { json } = require("express");
const jwt = require('jsonwebtoken');

module.exports = ()=>{
    return (req,res,next) =>{
        // console.log("middleware authorization");
        const token = req.header('Authorization');
        if(!token){
            return res.status(401).json({'error':"Access denied!"});
        }else{
            const tk = token.replace('Bearer ', '');
            jwt.verify(tk, process.env.SESSION_TOKEN_SECRET, async (err, decoded) =>{
                if(err){
                  return res.status(401).json({'error':'Acess denided!'});
                }
                next();
            })
        }
    }
}