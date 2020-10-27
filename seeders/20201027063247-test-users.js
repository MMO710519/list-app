'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const now = new Date();
    return queryInterface.bulkInsert('Users', [
      { name: '太郎',  email: 'taro@example.com', password: 'taro', createdAt: now, updatedAt: now},
      { name: '次郎',  email: 'jiro@example.com', password: 'jiro', createdAt: now, updatedAt: now},
      { name: '三郎',  email: 'saburo@example.com', password: 'saburo', createdAt: now, updatedAt: now},
      { name: '四郎',  email: 'shiro@example.com', password: 'shiro', createdAt: now, updatedAt: now},
      { name: '五郎',  email: 'goro@example.com', password: 'goro', createdAt: now, updatedAt: now},
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};