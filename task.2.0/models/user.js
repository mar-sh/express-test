'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            args: true,
            msg: 'Invalid email format',
          },
          isUnique(email) {
            return User.findOne({
              where: {
                email,
              },
            }).then(registeredEmail => {
              if (registeredEmail) {
                throw new Error('Email is already in use');
              }
            });
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 32],
            msg: 'Name must be 3 characters or more',
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 64],
            msg: 'Password must be 3 characters or more',
          },
        },
      },
    },

    {}
  );
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};
