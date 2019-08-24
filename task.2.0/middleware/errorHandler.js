const setError = require('../helpers/errors');

function errorHandler(err, req, res, next) {
  process.env.NODE_ENV == 'development' && console.trace(err);
  const { code, message } = setError(err);

  res.status(code).json({ message });
}

module.exports = errorHandler;
