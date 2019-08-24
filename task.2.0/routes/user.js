const express = require('express');
const userController = require('../controllers/user');
const
{
  getAllUsers,
  getUserById,
  postCreateUser,
  putEditUser,
  patchEditUserPassword,
  deleteUserById,
} = userController;

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/', postCreateUser);
router.put('/:id', putEditUser);
router.patch('/:id', patchEditUserPassword);
router.delete('/:id', deleteUserById);

module.exports = router;