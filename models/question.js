const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Question = require("./question");
const { Schema } = mongoose;
const QuestionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    name: {
      type: String,
    },
    status: {
      type: String,
    },
    default: {
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
QuestionSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Question", QuestionSchema);