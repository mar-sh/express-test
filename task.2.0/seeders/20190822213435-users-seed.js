'use strict';
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');
const users = [];

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, '../users.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('data', row => {
          row.createdAt = new Date().toLocaleString();
          row.updatedAt = new Date().toLocaleString();
          users.push(row);
        })
        .on('end', () =>
          resolve(queryInterface.bulkInsert('Users', users, {}))
        );
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', null, {});
  },
};
