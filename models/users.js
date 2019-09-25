'use strict';

const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    cpf: DataTypes.STRING,
    name: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    timestamps: true,
    paranoid: true,
    hooks: {
      beforeCreate: (users) => {
        const salt = bcrypt.genSaltSync();
        users.password = bcrypt.hashSync(users.password, salt);
      }
    }
  });

  users.associate = function (models) {
    users.belongsToMany(models.profiles, { through: models.users_profiles })
    users.hasMany(models.projects);
    users.belongsTo(models.roles);
  };

  users.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return users;
};