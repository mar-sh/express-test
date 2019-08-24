const setError = require('../helpers/errors');

function errorHandler(err, req, res, next) {
  console.trace(err);
  const { code, message } = setError(err);

  res.status(code).json({ message });
}

module.exports = errorHandler;
