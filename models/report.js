const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const { Schema } = mongoose;
const ReportSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
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
      type: Boolean,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
ReportSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Report", ReportSchema);
