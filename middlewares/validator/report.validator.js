const expressValidator = require('express-validator')

module.exports= (req,user)=> {
    // req.checkBody("user_id", "Email is required").notEmpty(); //validate để trống trường email sử dụng hàm notEmpty()
    // req.checkBody("question_id","Phone is required").notEmpty();
    // req.checkBody("answer","answer is required").notEmpty();
    // return req.validationErrors();
    return false;
}
