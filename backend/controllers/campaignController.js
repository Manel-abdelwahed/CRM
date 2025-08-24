const Campaign = require('../models/Campaign');

// GET 
exports.getCampaigns = async (req, res) => {
  try {
    const campaigns = await Campaign.find();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// POST 
exports.createCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.create(req.body);
    res.status(201).json(campaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// PUT 
exports.updateCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!campaign) return res.status(404).json({ message: 'Campagne non trouvée' });
    res.json(campaign);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE 
exports.deleteCampaign = async (req, res) => {
  try {
    const campaign = await Campaign.findByIdAndDelete(req.params.id);
    if (!campaign) return res.status(404).json({ message: 'Campagne non trouvée' });
    res.json({ message: 'Campagne supprimée' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
