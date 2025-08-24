const express = require('express');
const router = express.Router();
const Analytics = require('../models/Analytics');
const axios = require('axios');

// manuelle 
router.post('/add', async (req, res) => {
  const analytics = new Analytics(req.body);
  await analytics.save();
  res.status(201).json({ message: 'Analytics saved', analytics });
});

// GET enty w compagne
router.get('/:campaignId', async (req, res) => {
  const stats = await Analytics.find({ campaignId: req.params.campaignId });
  res.json(stats);
});

//  import facebook
router.get('/sync/facebook/:campaignId/:accessToken/:adAccountId', async (req, res) => {
  const { campaignId, accessToken, adAccountId } = req.params;
  try {
    const fields = 'clicks,impressions,spend,actions';
    const resp = await axios.get(`https://graph.facebook.com/v16.0/${adAccountId}/insights`, {
      params: {
        fields,
        access_token: accessToken,
        time_range: { since: '2025-01-01', until: 'today' },
        level: 'campaign',
        filters: [`{field:"campaign.id",operator:EQUAL,values:["${campaignId}"]}`]
      }
    });
    const records = resp.data.data.map(r => ({
      campaignId,
      source: 'facebook',
      clicks: parseInt(r.clicks) || 0,
      impressions: parseInt(r.impressions) || 0,
      cost: parseFloat(r.spend) || 0,
      conversions: r.actions?.find(a => a.action_type === "offsite_conversion")?.value || 0,
      date: new Date(r.date_start)
    }));
    await Analytics.insertMany(records);
    res.json({ message: 'Facebook sync ok', count: records.length });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔄 google Analytics
router.get('/sync/google/:campaignId', async (req, res) => {
  try {
    const { BetaAnalyticsDataClient } = require('@google-analytics/data');
    const client = new BetaAnalyticsDataClient({
      keyFilename: process.env.GOOGLE_KEYFILE
    });
    const propertyId = process.env.GOOGLE_PROPERTY_ID;

    const [response] = await client.runReport({
      property: `properties/${propertyId}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'campaignName' }],
      metrics: [{ name: 'sessions' }, { name: 'activeUsers' }]
    });

    // converstion resultat
    const records = response.rows.map(row => ({
      campaignId: req.params.campaignId,
      source: 'google',
      clicks: parseInt(row.metricValues[0]?.value) || 0,
      impressions: parseInt(row.metricValues[1]?.value) || 0,
      conversions: 0,
      cost: 0,
      date: new Date()
    }));
    await Analytics.insertMany(records);
    res.json({ message: 'Google sync ok', count: records.length });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
