module.exports = ()=>{
    return (req,res,next) =>{
        console.log("middleware authorization");
        const auth = req.header('Authorization');
        if(!auth){
            return res.status(401).send("Access denied!")
        }else{
            next();
        }
    }
}