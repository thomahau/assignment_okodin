'use strict';
module.exports = (sequelize, DataTypes) => {
  var Like = sequelize.define('Like', {
    likerId: DataTypes.INTEGER,
    likeeId: DataTypes.INTEGER
  });

  Like.associate = function(models) {
    Like.belongsTo(models.User, {
      foreignKey: 'likerId'
    });

    Like.belongsTo(models.User, {
      foreignKey: 'likeeId'
    });
  };
  return Like;
};

