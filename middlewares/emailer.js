const User = require('../models/users')
const { itemAlreadyExists } = require('../middlewares/utils')

module.exports = {
    /**
     * Checks User model if user with an specific email exists
     * @param {string} email - user email
     */
    async emailExists(email) {
      return new Promise((resolve, reject) => {
        User.findOne(
          {
            email
          },
          (err, item) => {
            itemAlreadyExists(err, item, reject, 'EMAIL_ALREADY_EXISTS')
            resolve(false)
          }
        )
      })
    }
}