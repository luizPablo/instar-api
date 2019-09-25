'use strict';
module.exports = (sequelize, DataTypes) => {
  const users_profiles = sequelize.define('users_profiles', {
    userId: DataTypes.INTEGER,
    profileId: DataTypes.INTEGER
  }, {});

  users_profiles.associate = function(models) {
    // associations can be defined here
  };
  
  return users_profiles;
};