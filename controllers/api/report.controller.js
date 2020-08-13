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
const Question = require('../../models/question');
const Report = require('../../models/report');
const { json } = require('body-parser');
/**
 * get create question 
 */
exports.create = async (req, res) => {
    try {
        //check error Validate request
        const errors = validationResult(req);
        //get time_report in table report
        const time = await setting.findOne({ "settingName": "Setting time_report" });
        // get status from time_report
        const status_report = await parsetimereport(time.settingValue.start, time.settingValue.end)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        } else {
            let i = 0;
            var user_id = req.body.user_id;
            var list_answer = req.body.answer;
            // get list_question in database
            const list_question = await Question.find({});
            if (list_question) {
                list_question.forEach(question => {
                    const boolean = isImage(list_answer[i]);
                    if (boolean) {
                        answer_text = null;
                        answer_url = list_answer[i];
                    } else {
                        answer_text = list_answer[i];
                        answer_url = null;
                    }
                    const report = new Report({
                        userId: user_id,
                        questionId: question._id,
                        answerUrl: answer_url,
                        answerText: answer_text,
                        status: status_report,
                    });
                    // save report in table
                    report.save();
                    i++;
                });
                return ReS(res, { success: "Created successfully!" }, 200);
            }
            res.status(202).json({ "error": "List Question is Null" });
        }
    } catch (error) {
        until.handleError(res, error);
    }

}
/**
 * 
 * sample curl 
curl --location --request GET 'localhost:3000/report/get_list_report?selectedDate=1597324054' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdXNlciI6eyJpZCI6IjVmMzU0MDI0ZjZiZTdlOWZjOGVlNmRiOCIsImVtYWlsIjoidGFuaHVuZ2h1ZUBnbWFpbC5jb20ifSwiaWF0IjoxNTk3MzI1NDQ4LCJleHAiOjE1OTczMjYzNDh9.nt31KASToehTag-4fntcSqJy97BRy_K9vLvUkpLnjcE' \
--header 'Cookie: JSESSIONID=9AE44852C521750C8F501FF86751E05D'
 */
exports.get_list_report = async (req, res) => {

    // example: 1597324054
    const { selectedDate } = req.query
    const currentDate = new Date(selectedDate * 1000);
    currentDate.setHours(0, 0, 0);
    const netDate = new Date(selectedDate * 1000);
    netDate.setHours(0, 0, 0);
    netDate.setDate(netDate.getDate() + 1);

    const list_question = await Question.aggregate([
        {
            $lookup:
            {
                from: "reports",
                localField: "_id",
                foreignField: "questionId",
                as: "user_report"
            }
        },
        {
            "$match": {
                "user_report.createdAt": { $gte: currentDate, $lt: netDate }
            }
        }
    ])

    const fetchPromise = list_question.map(async (question) => {
        const promises = question.user_report.map(async (report) => {
            var opts = [
                { path: 'userId', select: 'name avatar' },
            ];
            return Report.populate(report, opts);
        });

        question.user_report = await Promise.all(promises);
        return question;
    })

    const result = await Promise.all(fetchPromise);

    res.status(202).json({ success: "OK", data: result });
}