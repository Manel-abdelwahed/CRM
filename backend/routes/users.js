const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');
const { getUsers, createUser, deleteUser } = require('../controllers/userController');

router.get('/', auth, verifyRole('admin'), getUsers);
router.post('/', auth, verifyRole('admin'), createUser);
router.delete('/:id', auth, verifyRole('admin'), deleteUser);

module.exports = router;
