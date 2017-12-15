'use strict';
module.exports = (sequelize, DataTypes) => {
  var View = sequelize.define('View', {
    viewerId: DataTypes.INTEGER,
    vieweeId: DataTypes.INTEGER
  });

  View.associate = function(models) {
    View.belongsTo(models.User, {
      foreignKey: 'viewerId'
    });

    View.belongsTo(models.User, {
      foreignKey: 'vieweeId'
    });
  };
  return View;
};
