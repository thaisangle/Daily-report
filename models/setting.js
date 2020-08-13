const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
// const Setting = require("./setting");
const { object } = require("mongoose/lib/utils");
const SettingSchema = new mongoose.Schema(
  {
    settingName: {
      type: String,
      required: true,
    },
    settingValue: {
      type: object,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
SettingSchema.plugin(mongoosePaginate);

const Setting = mongoose.model("Setting", SettingSchema);

const SettingTimeReportSchema = new mongoose.Schema(
  {
    dayStart: String,
    dayEnd: String,
    start: String,
    end: String,
  },
  { _id: false }
);
const SettingTimeReportMoDel = mongoose.model(
  "SettingTimeReport",
  SettingTimeReportSchema
);
export default Setting;
export { SettingTimeReportMoDel };