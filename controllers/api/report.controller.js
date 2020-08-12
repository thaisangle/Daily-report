const Question  = require('../../models/question');
const Report = require('../../models/report');
const { to, ReE, ReS } = require("../../services/util.service");
const validatorReport = require('../../middlewares/validator/report.validator');
const parsetimereport = require('../../helper/parse/report')
const until = require('../../helper/utils')
const { request } = require('express');
const isImage = require('is-image');
const { findById, findOne } = require('../../models/question');
const { body, validationResult } = require('express-validator');
const question = require('../../models/question');
/**
 * get create question 
 */
exports.creater = async (req,res) =>{
    // let datenow = new Date();
        // let hours = datenow.getHours();
        // console.log(hours)
        // Finds the validation errors in this request and wraps them in an object with handy functions
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
            let i = 0;
            var user_id = req.body.user_id;
            var list_answer = req.body.answer;
            // get list_question in database
            const list_question = await Question.find({});
            if(list_question){
                list_question.forEach(question => {
                    // console.log(i);
                    if(isImage(list_answer[i])){
                        answer_text = null;
                        answer_url = list_answer[i];
                    }else{
                        answer_text = list_answer[i];
                        answer_url = null;
                    }
                    // console.log(question._id)
                    // console.log(answer_url)
                    // console.log(answer_text)
                    // inser report in table Report 
                    const report = new Report({
                        userId :user_id,
                        questionId :question._id,
                        answerUrl : answer_url,
                        answerText : answer_text,
                        status : true,
                    });
                    // save report 
                    report.save();
                    i++;
                });
                return ReS(res, { success: "Created successfully!"}, 200);
            }
            res.status(202).json({"error":"List Question is Null"});
        }  
    } catch (error) {
        until.handleError(res, error);
    }
        
}
// } 
// exports.getListReport = async(req,res) =>{
//     // const listReport = Report.find({}).toArray();
//     console.log("ss");
// }