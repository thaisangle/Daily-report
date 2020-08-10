const Question = require('../../models/question')
const { to, ReE, ReS } = require("../../services/util.service");
const until = require('../../helper/utils')

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