const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");
const Role = require("../models/roles");
const utils = require("../middlewares/utils");

const RolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

RolesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Roles", RolesSchema);
