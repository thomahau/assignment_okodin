'use strict';
module.exports = (sequelize, DataTypes) => {
  var Profile = sequelize.define(
    'Profile',
    {
      aboutMe: DataTypes.TEXT,
      talents: DataTypes.TEXT,
      favorites: DataTypes.TEXT,
      whyMe: DataTypes.TEXT,
      age: DataTypes.INTEGER,
      gender: DataTypes.STRING,
      maritalStatus: DataTypes.STRING,
      height: DataTypes.INTEGER,
      bodyType: DataTypes.STRING,
      children: DataTypes.BOOLEAN,
      occupation: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      locationId: DataTypes.INTEGER
    },
    {
      classMethods: {
        associate: function(models) {
          // associations can be defined here
          Profile.hasOne(models.User, {
            foreignKey: 'profileId'
          });
          Profile.belongsTo(models.Location, {
            foreignKey: 'locationId'
          });
        }
      }
    }
  );
  return Profile;
};
