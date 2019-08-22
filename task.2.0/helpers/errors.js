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
const sequelizeErrors = ['BaseError', 'ValidationError', 'ValidationErrorItem'];

function setError(errorObject) {
  const error = { ...errorObject };

  if (error.code && error.message) {
    return error;
  }
  if (nodeError.includes(error.name)) {
    error.code = 500;
    return error;
  }
  if (sequelizeErrors.includes(error.name)) {
    if (error.message.match(/is already in use/gi)) {
      error.code = 409;
    } else error.code = 400;
    return error;
  }
  error.code = 500;
  error.message = 'Internal server error';

  return error;
}

module.exports = setError;
