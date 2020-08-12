const Setting = require('../../models/setting')
const { itemAlreadyExists } = require('../utils')

module.exports = {
    /**
     * Checks User model if user with an specific email exists
     * @param {string} email - user email
     */
    async settingExists(name) {
      return new Promise((resolve, reject) => {
        Setting.findOne(
          {
            settingName:name
          },
          (err, item) => {
            itemAlreadyExists(err, item, reject, 'SETTING_ALREADY_EXISTS')
            resolve(false)
          }
        )
      })
    }
}