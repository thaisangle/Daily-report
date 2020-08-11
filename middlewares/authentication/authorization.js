const { json } = require("express");

module.exports = ()=>{
    return (req,res,next) =>{
        // console.log("middleware authorization");
        const token = req.header('Authorization');
        if(!token){
            return res.status(401).json("Access denied!");
        }else{
            next();
        }
    }
}