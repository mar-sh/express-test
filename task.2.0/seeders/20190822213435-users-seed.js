'use strict';
const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

const userDatabase = [
  {
    email: 'jennifer@gmail.com',
    name: 'jenifer',
    password: '1234jenifer',
  },
  {
    email: 'bram@gmail.com',
    name: 'bravo',
    password: '1bravo',
  },
  {
    email: 'tom@gmail.com',
    name: 'tom',
    password: '1234jenitom',
  },
  {
    email: 'maximillian@gmail.com',
    name: 'max',
    password: '1234jenifer',
  },
  {
    email: 'tomo@gmail.com',
    name: 'tom',
    password: '1234jenifer',
  },
  {
    email: 'marooke@gmail.com',
    name: 'mar',
    password: '1234jenifer',
  },
];

userDatabase.forEach((user) => {
  user.createdAt = new Date().toUTCString();
  user.updatedAt = new Date().toUTCString();
})

module.exports = {
  up: (queryInterface, Sequelize) => {
    return new Promise((resolve, reject) => {
      fs.createReadStream(path.join(__dirname, '../users.csv'))
        .pipe(csv.parse({ headers: true }))
        .on('data', row => {
          row.createdAt = new Date().toUTCString();
          row.updatedAt = new Date().toUTCString();
          userDatabase.push(row);
        })
        .on('end', () =>
          resolve(queryInterface.bulkInsert('Users', userDatabase, {}))
        );
    });
  },

  down: (queryInterface, Sequelize) => {
    queryInterface.bulkInsert('Users', null, {});
  },
};
