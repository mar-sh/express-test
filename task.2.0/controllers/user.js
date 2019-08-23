const { User } = require('../models');

class UserController {

  static getAllUsers(req, res, next) {
    User
      .findAll()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  };

  static getUserById(req, res, next) {

  };

  static postCreateUser(req, res, next) {

  };

  static putEditUser(req, res, next) {

  };

  static patchEditUserPassword(req, res ,next) {

  };

  static deleteUserById(req, res, next) {

  };

};

module.exports = UserController;