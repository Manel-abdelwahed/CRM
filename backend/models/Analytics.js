const mongoose = require('mongoose');

const AnalyticsSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: 'Campaign', required: true },
  source: { type: String, required: true },
  clicks: Number,
  impressions: Number,
  cost: Number,
  conversions: Number,
  date: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Analytics', AnalyticsSchema);
