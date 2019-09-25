'use strict';
module.exports = (sequelize, DataTypes) => {
  const projects = sequelize.define('projects', {
    name: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
  });

  projects.associate = function(models) {
    projects.hasMany(models.profiles);
    projects.hasMany(models.entities);
    projects.belongsTo(models.users);
  };

  return projects;
};