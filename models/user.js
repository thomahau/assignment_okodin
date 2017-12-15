'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
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
  });

  User.associate = function(models) {
    // associations can be defined here
    User.hasOne(models.Profile, {
      foreignKey: 'userId'
    });

    User.hasMany(models.View, {
      foreignKey: 'viewerId'
    });

    User.belongsToMany(models.User, {
      through: models.View,
      as: 'Viewer',
      foreignKey: 'viewerId'
    });

    User.hasMany(models.View, {
      foreignKey: 'vieweeId'
    });

    User.belongsToMany(models.User, {
      through: models.View,
      as: 'Viewee',
      foreignKey: 'vieweeId'
    });
  };

  return User;
};
