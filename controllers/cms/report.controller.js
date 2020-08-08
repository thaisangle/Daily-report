const Question  = require('../../models/question');
const Report = require('../../models/report');
const { to, ReE, ReS } = require("../../services/util.service");
const validatorReport = require('../../middlewares/validator/report.validator');
const parsetimereport = require('../../helper/parse/report')
const until = require('../../helper/utils')
const { request } = require('express');
const isImage = require('is-image');
/**
 * get create question 
 */
exports.creater = async (req,res) =>{
    // const error  = validatorReport(req,res);
    // if(error){
    //     // return utils.handleError(res, error);
    // }else{
        try {
            var answer_url = null;
            var answer_text = req.body.answer;
            // if(isImage(req.body.answer)){
            //     answer_text = null;
            //     anser_url = req.body.answer;
            // }else{
            //     answer_text = req.body.answer;
            //     anser_url = null;
            // }
            // const statu_report = parsetimereport.paserstatus();
            const report = new Report({
                userId :req.body.user_id,
                questionId :req.body.request_id,
                answerUrl : answer_url,
                answerText : answer_text,
                status : true,
            });
        
             const reportSave = await report.save();
            return ReS(res, { success: "Registered successfully!", user: reportSave }, 200);
        } catch (error) {
            until.handleError(res, error);
        }
        
    // }
} 