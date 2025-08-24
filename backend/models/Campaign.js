const mongoose = require('mongoose');

const CampaignSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  startDate: Date,
  endDate: Date,
  budget: Number,
  status: { type: String, enum: ['active', 'paused', 'completed'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Campaign', CampaignSchema);
