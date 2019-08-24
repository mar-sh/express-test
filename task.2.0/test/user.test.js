const request = require('supertest');
const assert = require('assert');
const app = require('../server');

const { User } = require('../models');

let id;

describe('GET /users', function() {
  before(function(done) {
    const newUser = {
      email: 'test@test.com',
      name: 'testy',
      password: 'test123',
    };

    User.create(newUser)
      .then(newUser => {
        id = newUser.id;
        done();
      })
      .catch(() => done());
  });

  after(function(done) {
    User.destroy({ where: { id } })
      .then(() => done())
      .catch(() => done());
  });

  it('should return array of objects with status code 200', function(done) {
    request(app)
      .get('/users')
      .end(function(err, res) {
        const { body, status } = res;
        assert.ifError(err);
        
        assert.equal(status, 200);
        assert.equal(Array.isArray(body), true);
        assert.ok(body.length, true);
        assert.ok(Object.keys(body[0], true));
        assert.ok(('email' in body[0], true));
        assert.ok(('name' in body[0], true));
        assert.ok(('password' in body[0], true));
        assert.equal(typeof body[0]['email'], 'string');
        assert.equal(typeof body[0]['name'], 'string');
        assert.equal(typeof body[0]['password'], 'string');

        done();
      });
  });
});
