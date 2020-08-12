const Question = require('../../models/question')
const { to, ReE, ReS } = require("../../services/util.service");
const until = require('../../helper/utils')

const QUESTION_TEXT = "0";
const QUESTION_OPTION = "1";

module.exports = {
  create: async (req, res, next) => {
    try {
      let { title, name, status, defaults = false, answers = [] } = req.body;

      if (status !== QUESTION_TEXT && status !== QUESTION_OPTION) {
        return ReE(res, { err: "Status equals 0 or 1" }, 400);
      }
      if (status === QUESTION_OPTION) {
        name = "";
      }
      const questionId = new mongoose.mongo.ObjectId();
      const newQuestion = new Question({
        _id: questionId,
        title: title,
        name: name,
        status: status,
        default: defaults,
      });

      await newQuestion.save();

      if (status === QUESTION_OPTION) {
        const newAnswerArray = [];
        answers.map(async (item) => {
          try {
            const newAnswer = new Answer({
              questionId: questionId,
              answerText: item,
              answerUrl: "null",
              status: status,
            });
            await newAnswerArray.push(newAnswer);
          } catch (error) {
            utils.handleError(res, error);
          }
        });

        await Answer.create(newAnswerArray, function (err) {
          if (err) utils.handleError(res, error);
        });

        ReS(res, { success: "Created!" }, 200);
      }
    } catch (error) {
      utils.handleError(res, error);
    }
  },
  /**
   * @param: @constant QUESTION_OPTION or @constant QUESTION_TEXT
   * @param:default: true : question default
   */
  getAllQuestion: async (req, res, next) => {
    try {
      const listAnswer = await Question.aggregate([
        {
          $lookup: {
            from: "answers",
            localField: "_id",
            foreignField: "questionId",
            as: "child",
          },
        },
      ]);
      if (!listAnswer) return ReE(res, { error: "Not found" }, 404);

      ReS(res, { data: listAnswer }, 200);
    } catch (error) {
      utils.handleError(res, error);
    }
  },

  deleteQuestion: async (req, res, next) => {
    try {
      var _id = req.params.id;
      const question = await Question.find({ _id: _id, default: false });
      if (!question) {
        return ReE(res, { error: "Not found" }, 404);
      } else {
        Promise.all([
          Question.deleteOne({ _id: _id }),
          Answer.deleteOne({ questionId: _id }),
        ])
          .then((values) => {
            ReS(res, { success: "Deleted" }, 200);
          })
          .catch((error) => {
            utils.handleError(res, error);
          });
      }
    } catch (error) {
      utils.handleError(res, error);
    }
  },

  updateQuestionById: async (req, res, next) => {
    try {
      const id = req.params.id;

      const question = await Question.findOne({ _id: id, default: false });

      if (!question) return ReE(res, { error: "Not found" }, 404);

      const { title, name, status, defaults, answers = [] } = req.body;

      if (status !== QUESTION_OPTION && status !== QUESTION_TEXT) {
        return ReE(res, { err: "Status equals 0 or 1" }, 400);
      }

      question.title = title ? title : question.title;
      question.name = name ? name : question.name;
      question.status = status ? status : question.status;
      question.default = defaults ? defaults : question.default;
      question.answers = answers ? answers : [];

      await question.save();
      // return ReS(res, { question: question });
      if (status === QUESTION_OPTION) {
        const newAnswerArray = [];
        answers.map(async (item) => {
          try {
            const newAnswer = new Answer({
              questionId: id,
              answerText: item,
              answerUrl: "null",
              status: status,
            });
            await newAnswerArray.push(newAnswer);
          } catch (error) {
            utils.handleError(res, error);
          }
        });

        await Answer.create(newAnswerArray, function (err) {
          if (err) utils.handleError(res, error);
        });
      }
      ReS(res, { success: "Updated!", question: question }, 200);
    } catch (error) {
      utils.handleError(res, error);
    }
  },
};
