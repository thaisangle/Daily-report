const expressValidator = require('express-validator')
const { check, validationResult } = require('express-validator');

module.exports = ()=> {
    return (req,res,next)=>{
        check("user_id", "Email is required").notEmpty(); //validate để trống trường email sử dụng hàm notEmpty()
        check("question_id","Phone is required").notEmpty();
        check("answer","answer is required").notEmpty();
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
            next();
        }
    }
    
    // return req.validationErrors();
    // return false;
}
