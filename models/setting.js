const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Setting = require("./setting");
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
module.exports = mongoose.model("Setting", SettingSchema);