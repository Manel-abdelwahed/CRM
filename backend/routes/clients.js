const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const {
  getClients,
  createClient,
  updateClient,
  deleteClient
} = require('../controllers/clientController');

// أي مستخدم موثوق ينجم يشوف
router.get('/', auth, getClients);

// فقط المسؤول التجاري ينجم يضيف، يبدل، يمسح
router.post('/', auth, verifyRole('commercial'), createClient);
router.put('/:id', auth, verifyRole('commercial'), updateClient);
router.delete('/:id', auth, verifyRole('commercial'), deleteClient);

module.exports = router;