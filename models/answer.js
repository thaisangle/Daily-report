const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Answer = require("./answer");
const { Schema } = mongoose;
const AnswerSchema = new mongoose.Schema(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
    answerText: {
      type: String,
    },
    answerUrl: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
AnswerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Answer", AnswerSchema);