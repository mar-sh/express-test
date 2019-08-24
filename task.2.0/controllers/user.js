const { User } = require('../models');
const { validateId } = require('../helpers/validateId');

class UserController {
  static getAllUsers(req, res, next) {
    let { page, limit, sortAttribute, sortMethod } = req.query;
    let offset = page * limit;

    const sortAttributes = ['email', 'name', 'createdAt', 'updatedAt'];
    const sortMethods = ['DESC', 'ASC'];

    if (!sortAttributes.includes(sortAttribute)) {
      sortAttribute = 'id';
    }
    if (!sortMethods.includes(sortMethod)) {
      sortMethod = 'ASC';
    }
    if (!page || !limit) {
      page = 0;
      offset = 0;
    }

    User.findAll({
      limit,
      offset,
      order: [[sortAttribute, sortMethod]],
    })
      .then(users => res.json(users))
      .catch(next);
  }

  static getUserById(req, res, next) {
    const { id } = req.params;

    User.findByPk(id)
      .then(user => res.json(user))
      .catch(next);
  }

  static postCreateUser(req, res, next) {
    const { email, name, password } = req.body;

    User.create({ email, name, password })
      .then(() => res.status(201).json({ email, name }))
      .catch(next);
  }

  static async putEditUser(req, res, next) {
    const { id } = req.params;
    const { name, email } = req.body;

    try {
      const user = await validateId(id);

      user.email = email || user.email;
      user.name = name || user.name;

      await user.save();

      return res.json({ email, name, status: 'updated' });
    } catch (err) {
      next(err);
    }
  }

  static async patchEditUserPassword(req, res, next) {
    const { id } = req.params;
    const { password } = req.body;
    const { oldPassword } = req.body;

    if (!password) {
      throw { code: 400, message: 'Password is required' };
    }

    try {
      const user = await validateId(id);

      if (user.password == oldPassword) {
        user.password = password;

        await user.save();

        return res.json({ status: 'updated' });
      } else {
        throw { code: 400, message: 'Incorrect (old) password' };
      }
    } catch (err) {
      next(err);
    }
  }

  static async deleteUserById(req, res, next) {
    const { id } = req.params;

    try {
      const user = await validateId(id);

      await user.destroy();
      return res.status(200).json({ id, status: 'deleted' });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
