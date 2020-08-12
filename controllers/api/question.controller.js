const Question = require('../../models/question')
const Answer = require('../../models/answer')
const { to, ReE, ReS } = require("../../services/util.service");
const until = require('../../helper/utils');
const { json } = require('express');

module.exports.create  = async (req,res)=>{
   try {
        const question = new Question({
            name:req.body.name,
            status:req.body.status,
            default:req.body.default,
        })
        const questionsave = await question.save();
        return ReS(res, { success: "Registered successfully!", user: questionsave }, 200);
    } catch (error) {
        until.handleError(res, error);
    }
}
module.exports.list_report = async (req,res)=>{
    try {
        const list_report = await Question.aggregate([
            {
              $lookup:
                {
                  from: "answers",
                  localField: "_id",
                  foreignField: "questionId",
                  as: "answer_question"
                }
           }])
         if(list_report){
             res.status(200).send(list_report);
         }
    } catch (error) {
            res.status('500').json({'Error':error});
    }
}