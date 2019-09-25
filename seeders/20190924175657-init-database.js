'use strict'

const bcrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    await queryInterface.bulkInsert('roles', [
      {
        identifier: 'super-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        identifier: 'admin-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        identifier: 'default-user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {})

    const salt = bcrypt.genSaltSync();
    const password = bcrypt.hashSync('123456', salt);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Luiz Pablo',
        username: 'lpsuper',
        password: password,
        cpf: '09259451450',
        roleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Luiz Pablo',
        username: 'lpadmin',
        password: password,
        cpf: '09259451451',
        roleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Luiz Pablo',
        username: 'lpdefault',
        password: password,
        cpf: '09259451452',
        roleId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {})
    await queryInterface.bulkDelete('users', null, {})
  }
};
