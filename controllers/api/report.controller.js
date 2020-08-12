const { to, ReE, ReS } = require("../../services/util.service");
const validatorReport = require('../../middlewares/validator/report.validator');
const { body, validationResult } = require('express-validator');
// helper
const parsetimereport = require('../../helper/parse/time_report')
const until = require('../../helper/utils')
const { request } = require('express');
const isImage = require('is-image');
//model 
const { findById, findOne } = require('../../models/question');
const setting = require('../../models/setting');
const Question  = require('../../models/question');
const Report = require('../../models/report');
const { json } = require('body-parser');
/**
 * get create question 
 */
exports.create = async (req,res) =>{
    try {
        //check error Validate request
        const errors = validationResult(req);
        //get time_report in table report
        const time = await setting.findOne({"settingName":"Setting time_report"});
        // get status from time_report
        const status_report = await parsetimereport(time.settingValue.start,time.settingValue.end)
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
                    const boolean = isImage(list_answer[i]);
                    if(boolean){
                        answer_text = null;
                        answer_url = list_answer[i];
                    }else{
                        answer_text = list_answer[i];
                        answer_url = null;
                    }
                    const report = new Report({
                        userId :user_id,
                        questionId :question._id,
                        answerUrl : answer_url,
                        answerText : answer_text,
                        status : status_report,
                    });
                    // save report in table
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
exports.get_list_report = async(req,res) =>{
    const date  = new Date().getDate();
    console.log(date);
    const list_question = await Question.aggregate([
        {
          $lookup:
            {
              from: "reports",
              localField: "_id",
              foreignField: "questionId",
              as: "user_report"
            }
       }])
    list_question.forEach(element => {
        console.log(element);
    });
    const list_report = await Report.find({createdAt:Date()});
    res.json(list_question);
}