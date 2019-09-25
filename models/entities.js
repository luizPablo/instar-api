'use strict';
module.exports = (sequelize, DataTypes) => {
  const entities = sequelize.define('entities', {
    name: DataTypes.STRING,
    projectId: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
  });

  entities.associate = function(models) {
    entities.belongsTo(models.projects);
  };

  return entities;
};