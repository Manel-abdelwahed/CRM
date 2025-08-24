const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const verifyRole = require('../middleware/verifyRole');

const {
  getCampaigns,
  createCampaign,
  updateCampaign,
  deleteCampaign
} = require('../controllers/campaignController');

// ✅ كل الأدوار يشوفو الحملات
router.get('/', auth, getCampaigns);

// ✅ فقط marketing ينجم يضيف، يبدل، يمسح
router.post('/', auth, verifyRole('marketing'), createCampaign);
router.put('/:id', auth, verifyRole('marketing'), updateCampaign);
router.delete('/:id', auth, verifyRole('marketing'), deleteCampaign);

module.exports = router;

