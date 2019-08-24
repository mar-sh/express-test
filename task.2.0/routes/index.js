const express = require('express');
const userRoutes = require('./user');
const errorHandler = require('../middleware/errorHandler');
const router = express.Router();

router.use('/users', userRoutes);

router.use(errorHandler);

module.exports = router;