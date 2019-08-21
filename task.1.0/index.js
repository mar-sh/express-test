'use strict';
const express = require('express');
const bodyParser = require('body-parser');

const helpers = require('./helper');
const {
  paginate,
  sort,
  validateId,
  validateInputs,
  bubbleSort,
  quickSort,
} = helpers;

const app = express();
const port = 3000;

// Fake database
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Task 1.1 Pagination
 * Create a pagination handler for userDatabase resource.
 * sortMethtod : value (desc, asc) default sorting method.
 * sortAttribute : value (email, name) from which attributes resources will be sorted
 * limit : number of resource instance that will be shown on response
 * page : current page number.
 */
app.get('/users', (req, res) => {
  const { page, limit, sortMethod, sortAttribute } = req.query;
  const data = sort(userDatabase, sortAttribute, sortMethod);
  const { hasNext, results } = paginate(data, page, limit);

  return res.json({ hasNext, results });
});

// An example of a handler with simple input validation.
app.get('/users/:id', (req, res) => {
  let { id } = req.params;

  if (validateId(id)) {
    id = id - 1;
    return res.json(userDatabase[id]);
  }
});

/**
 * Task 1.2 Create a new user
 * Create a new user and save it into userDatabase.
 */
app.post('/users', (req, res) => {
  const { name, email, password } = req.body;
  const results = validateInputs(userDatabase, email, name, password);

  if (typeof results == 'boolean' && results) {
    userDatabase.push({ email, name, password });
    return res.status(201).json({ email, name });
  } else {
    return res.status(400).json(results);
  }
});

/**
 * Task 1.3 Bulk Upload
 * Parse provided csv file and save all the data into userDatabase.
 */
app.post('/users/csv', (req, res) => {
  return [];
});

/**
 * Task 1.4 Idempotent User Edit
 * Based on HTTP requirements the put must be IDEMPOTENT, create an idempotent
 * handler to serve user editting.
 */
app.put('/users/:id', (req, res) => {
  return {};
});

/**
 * Task 1.5 Patch Method
 * Create handler for change password handler
 */
app.patch('/users/:id/changepassword', (req, res) => {
  return {};
});

/**
 * Task 1.6 Delete Method
 * Create handler for deleting and entry
 */
app.delete('/users/:id', (req, res) => {
  let { id } = req.params;

  // Soft delete
  if (validateId(id)) {
    userDatabase[id - 1].deleted = true;
    return res.json({ id });
  }
});

/**
 * Task 1.7 Plain JS Bubble Sort
 * Create a handler to sort resources only by using pure javascript, without assistance
 * of third party lib for bubble sorting algorithm.
 */
app.get('/users/sort/bubble', (req, res) => {
  const { sortAttribute, sortMethod } = req.body;
  const results = bubbleSort(userDatabase, sortAttribute, sortMethod);

  return res.json({ results });
});

/**
 * Task 1.8 Plain JS Divide Conquer
 * Create a handler to sort resources only by using pure javascript, without assistance
 * of third party lib for Divide Conquer sorting algorithm.
 */
app.get('/users/sort/divide', (req, res) => {
  const { sortAttribute, sortMethod } = req.body;
  const results = quickSort(userDatabase, sortAttribute, sortMethod);

  return res.json({ results });
});

// Not found handler
app.use('*', (req, res) => {
  res.status(404);

  res.json({
    error: {
      code: 404,
      message: 'Could not find any associated resource',
    },
  });
});

// Error handler
app.use((err, req, res, next) => {

  res.status(err.code || 500).json({
    error: {
      code: err.code || 500,
      message: err.message || 'Server Error',
    },
  });
});

/**
 * Task 2.0
 * Recreating Handlers Using Postgres
 * Clone this project and do these tasks below:
 * - Create a seeder from userDatabase object and save it into Postgres.
 * - Recreate all the handlers and use sequelize to sort, save, edit etc (except for task 1.7 and 1.8)
 */

app.listen(port, () => console.log(`App is running on port, ${port}`));
