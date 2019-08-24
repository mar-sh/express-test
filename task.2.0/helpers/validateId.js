const { User } = require('../models');

function validateId(id) {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByPk(id);

      if (user) {
        resolve(user);
      } else {
        throw { code: 404, message: 'Could not find user with that id' };
      }
    } catch (err) {
      reject(err);
    }
  });
}

module.exports = {
  validateId,
};
