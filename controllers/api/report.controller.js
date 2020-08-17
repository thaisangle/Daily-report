const { to, ReE, ReS } = require("../../services/util.service");
const validatorReport = require("../../middlewares/validator/report.validator");
const { body, validationResult, Result } = require("express-validator");
// helper
const parsestatusreport = require("../../helper/parse/status_report");
const parsetimereport = require("../../helper/parse/time_report");
const until = require("../../helper/utils");
const check_report = require("../../helper/check/check_report")

const { request, response } = require("express");
const isImage = require("is-image");
//model
const { findById, findOne } = require("../../models/question");
// const Setting = require("../../models/setting");
import Setting, { SettingTimeReportMoDel } from "../../models/setting";
import report from "../../models/report";
const Question = require("../../models/question");
const Report = require("../../models/report");

const { json } = require("body-parser");
/**
 * get create question
 */
exports.create = async (req,res) =>{
    try {
        // await Report.remove({});
        
        //check error Validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }else{
            //get time_report in table setting
                 const time = await Setting.findOne({"settingName":"Setting time_report"});
            // set status_report
                 const status_report = await parsestatusreport(time.settingValue.start,time.settingValue.end)
            //set time_report
                // const date_now = new Date();
                // const date_parse = await parsetimereport(date_now).then((result)=>{
                //     return result;
                // })
            // console.log(date_now);
            // console.log(date_parse);

            let i = 0;
            var user_id = req.body.user_id;
            var answer_text = null;
            var answer_url  = null;

            // get list_question in database
            const list_answer = req.body.answer;
            const list_question = await Question.find({});
            if(list_question ){
                if(list_answer.length != list_question.length){
                   return res.status(500).json({"error":"Please Check answer! List answer not match list question..."});
                }
                list_question.map(question => {
                if(isImage(list_answer[i])){
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
            return res.status(501).json({"error":"List Question is Null"});
        }  
    } catch (error) {
        until.handleError(res, error);
    }
        
}
/**
 * Check report
 * @param {*} req 
 * @param {true/false} res 
 */
exports.check_report = async(req,res) =>{
    try {
        const user_id = req.body.user_id;
        if(!user_id){
          res.status(404).json({'error':'User not found!'})
        }
        const check = await check_report.check_report(user_id);
        return res.status(200).json({check})

    } catch (error) {
        until.handleError(res, error);
    }

}
/**
 * DELETE REPORT BY USER_ID
 * @param {USER_ID} req 
 * @param {DELETE REPORT WITH USER_ID} res 
 */
exports.delete_report = async(req,res) =>{
    const user_id = req.body.user_id;
    const list_report_user = await Report.find({userId:user_id});
    if(list_report_user.length > 0){
        await Report.deleteMany({userId:user_id});
        res.status(200).json({"Message":"delete success!"})    
    }else{
        res.status(404).json({'Message':'List Report is Empty!'})
    }
    
}
/**
 * curl --location --request GET 'localhost:3000/report/get_list_report?selectedDate=1597324054' \
 * @param {date:1597331518791} req 
 * @param {*} res 
 */
exports.get_list_report = async (req, res) => {
    // example: 1597413043000
  
    const { selectedDate } = req.query;
  
    const serverTimeZoneOffset = (new Date()).getTimezoneOffset() / 60;
    const changeOffset = serverTimeZoneOffset + 7; // VN timezone
  
    const currentDate = new Date(selectedDate * 1);
    currentDate.setHours(currentDate.getHours() + changeOffset);
    currentDate.setHours(0, 0, 0);
  
    const netDate = new Date(selectedDate * 1);
    netDate.setHours(0, 0, 0);
    netDate.setDate(netDate.getDate() + 1);
  
    const list_question = await Question.aggregate([
      {
        $lookup: {
          from: "reports",
          let: { questionID: "$_id" },
          pipeline: [
            {
              $match: {
                $expr:
                {
                  $and:
                    [
                      { $eq: ["$questionId", "$$questionID"] },
                      { $gte: ["$createdAt", currentDate] },
                      { $lt: ["$createdAt", netDate] }
                    ]
                }
              },
            },
            { $project: { questionID: 0, _id: 0 } }
          ],
          as: "user_report",
        },
      },
    ]);
  
    const fetchPromise = list_question.map(async (question) => {
      const promises = question.user_report.map(async (report) => {
        var opts = [{ path: "userId", select: "name avatar" }];
        return Report.populate(report, opts);
      });
  
      question.user_report = await Promise.all(promises);
      return question;
    });
  
    const result = await Promise.all(fetchPromise);
  
    res.status(202).json({ success: "OK", data: result });
  };