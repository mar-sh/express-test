const nodeErrors = [
  'Error',
  'EvalError',
  'InternalError',
  'RangeError',
  'ReferenceError',
  'SyntaxError',
  'TypeError',
  'URIError',
];
const sequelizeErrors = ['BaseError', 'SequelizeValidationError'];

function setError(errorObject) {
  const error = { ...errorObject };

  if (error.code && error.message) {
    return error;
  }
  if (nodeErrors.includes(error.name)) {
    error.code = 500;
    return error;
  }
  if (sequelizeErrors.includes(error.name)) {
    const {errors} = error;
    error.message = [];

    errors.forEach(err => error.message.push(err.message));
    error.code = 400;
    return error;
  }
  error.code = 500;
  error.message = 'Internal server error';

  return error;
}

module.exports = setError;
