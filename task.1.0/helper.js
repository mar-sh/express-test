const fs = require('fs');
const path = require('path');
const csv = require('fast-csv');

function paginate(database, pageNumber = 1, pageLimit) {
  const currentPage = Number(pageNumber - 1);
  const perPage = Number(pageLimit) || database.length;

  const begin = currentPage * perPage;
  const end = begin + perPage;

  const hasNext = Boolean(end < database.length);

  return {
    hasNext,
    results: database.slice(begin, end),
  };
}

function sort(database, attribute, method = 'asc') {
  const result = [...database];
  const sortAttribute = (attribute && attribute.toLowerCase()) || '';

  if (!sortAttribute || (sortAttribute != 'name' && sortAttribute != 'email')) {
    return result;
  }

  result.sort((current, next) => {
    if (current[sortAttribute] < next[sortAttribute]) {
      return -1;
    } else if (current[sortAttribute] > next[sortAttribute]) {
      return 1;
    } else return 0;
  });

  if (method.toLowerCase() == 'desc') {
    result.reverse();
  }

  return result;
}

function validateId(database, id) {
  if (
    id <= 0 ||
    !parseInt(id, 10) ||
    isNaN(id) ||
    id > database.length ||
    database[id - 1].deleted
  ) {
    return false;
  } else return true;
}

function validateInputs(database, email, name, password) {
  const errors = [];
  const validatedEmail = validateEmail(database, email);
  const validatedName = validateName(name);
  const validatedPassword = validatePassword(password);

  if (
    typeof validatedEmail == 'boolean' &&
    typeof validatedName == 'boolean' &&
    typeof validatedPassword == 'boolean'
  ) {
    return true;
  } else {
    Array.isArray(validatedEmail) && errors.push(...validatedEmail);
    Array.isArray(validatedName) && errors.push(...validatedName);
    Array.isArray(validatedPassword) && errors.push(...validatedPassword);
  }
  return errors;
}

function validateEmail(database, email, httpMethod = '') {
  const errors = [];

  if (email && !/.+@.+\..+/gi.test(email)) {
    errors.push({ code: 400, field: 'email', message: 'Invalid email format' });
  }

  database.forEach(el => {
    if (email && el['email'] == email && httpMethod != 'PUT') {
      errors.push({
        code: 409,
        field: 'email',
        message: 'Email is already in use',
      });
    }
  });

  if (errors.length) {
    return errors;
  } else return true;
}

function validateName(name) {
  const errors = [];

  if (name && name.length < 3) {
    errors.push({
      code: 400,
      field: 'name',
      message: 'Name must be 3 characters or more',
    });
  }

  if (errors.length) {
    return errors;
  } else return true;
}

function validatePassword(password) {
  const errors = [];

  if (password && password.length < 3) {
    errors.push({
      code: 400,
      field: 'password',
      message: 'Password must be 3 characters or more',
    });
  }

  if (errors.length) {
    return errors;
  } else return true;
}

function bubbleSort(database, attribute = 'name', method = 'asc') {
  let finish = false;
  const result = [...database];

  while (!finish) {
    finish = true;

    for (let i = 0; i < result.length - 1; i++) {
      let temp = null;
      if (!result[i].attribute) {
        attribute = 'name';
      }
      if (result[i][attribute] > result[i + 1][attribute]) {
        temp = result[i + 1];
        result[i + 1] = result[i];
        result[i] = temp;
        finish = false;
      }
    }
  }

  return method.toLowerCase() == 'desc' ? result.reverse() : result;
}

function quickSort(database, attribute = 'name', method = 'asc') {
  if (database.length < 1) return database;

  const left = [];
  const right = [];
  const middle = [];
  const pivot = database[database.length - 1][attribute];

  database.forEach(el => {
    if (!el[attribute]) {
      attribute = 'name';
    }
    if (el[attribute] < pivot) {
      left.push(el);
    } else if (el[attribute] > pivot) {
      right.push(el);
    } else if (el[attribute][0] === pivot[0]) {
      middle.push(el);
    } else throw { code: 500 };
  });

  return method.toLowerCase() == 'desc'
    ? [
        ...quickSort(right, attribute, method),
        ...middle,
        ...quickSort(left, attribute, method),
      ]
    : [
        ...quickSort(left, attribute, method),
        ...middle,
        ...quickSort(right, attribute, method),
      ];
}

// function bulkUpload(database) {
//   const data = fs
//   .readFileSync(path.resolve(__dirname, 'users.csv'), 'utf8')
//   .split('\n')
//   .slice(1)
//   .map(row => row.split(','))
//   .map(parsed => ({ email: parsed[0], name: parsed[1], password: parsed[2] }));

//   return [...database, ...data];
// }

function bulkUpload(database) {
  const stream = fs.createReadStream(path.resolve(__dirname, 'users.csv'));

  return new Promise((resolve, reject) => {
    stream
      .pipe(csv.parse({ headers: true }))
      .on('data', row => database.push(row))
      .on('end', () => resolve(database))
      .on('error', err => reject(err));
  });
}

module.exports = {
  sort,
  paginate,
  validateId,
  validateInputs,
  validateEmail,
  validateName,
  validatePassword,
  bubbleSort,
  quickSort,
  bulkUpload,
};
