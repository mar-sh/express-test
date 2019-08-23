const express = require('express');
const userController = require('../controllers/user');
const
{
  getAllUsers,
} = userController;

const router = express.Router();

router.get('/', getAllUsers);

module.exports = router;