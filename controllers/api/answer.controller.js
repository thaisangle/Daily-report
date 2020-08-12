const Answer = require('../../models/answer')
const { to, ReE, ReS } = require("../../services/util.service");
const until = require('../../helper/utils');

module.exports.create  = async (req,res)=>{
   try {
        const answer = new Answer({
            questionId:req.body.questionid,
            answerText:null,
            answerUrl:null,
            status:req.body.status
        })
        const answersave = await answer.save();
        return ReS(res, { success: "Registered successfully!", user: answersave }, 200);
    } catch (error) {
        until.handleError(res, error);
    }
}