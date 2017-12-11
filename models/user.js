'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define(
    'User',
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Username cannot be empty'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            msg: 'Email cannot be empty'
          },
          isEmail: {
            msg: 'Email is invalid'
          }
        }
      },
      profileId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          User.hasOne(models.Profile, {
            foreignKey: 'userId'
          });
        }
      }
    }
  );
  return User;
};
