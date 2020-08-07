const Role = require("../models/roles");
const utils = require("../middlewares/utils");

const role = [{ name: "admin" }, { name: "user" }];

const createRolesDB = async (res, req) => {
  try {
    console.log("create");
    Role.find({}, function (err, roleResult) {
      if (err) {
        utils.handleError(res, err);
      } else {
        if (roleResult.length == 0) {
          Role.create(role);
        }
      }
    });
  } catch (error) {
    utils.handleError(res, error);
  }
};

module.exports = createRolesDB;
