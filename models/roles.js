'use strict';
module.exports = (sequelize, DataTypes) => {
  const roles = sequelize.define('roles', {
    identifier: DataTypes.STRING
  }, {
    timestamps: true,
    paranoid: true,
  });

  roles.associate = function(models) {
    // associations can be defined here
  };
  
  return roles;
};