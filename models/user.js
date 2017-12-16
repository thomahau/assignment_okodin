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
    // profile
    User.hasOne(models.Profile, {
      foreignKey: 'userId'
    });
    // views
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
    // likes
    User.hasMany(models.Like, {
      foreignKey: 'likerId'
    });

    User.belongsToMany(models.User, {
      through: models.Like,
      as: 'Liker',
      foreignKey: 'likerId'
    });

    User.hasMany(models.Like, {
      foreignKey: 'likeeId'
    });

    User.belongsToMany(models.User, {
      through: models.Like,
      as: 'Likee',
      foreignKey: 'likeeId'
    });
  };

  return User;
};
