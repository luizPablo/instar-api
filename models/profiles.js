'use strict';
module.exports = (sequelize, DataTypes) => {
  const profiles = sequelize.define('profiles', {
    name: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
  });

  profiles.associate = function(models) {
    profiles.belongsToMany(models.users, { through: models.users_profiles });
    profiles.belongsTo(models.projects);
  };

  return profiles;
};