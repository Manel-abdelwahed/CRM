const client= require('../models/Client');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//  GET 
exports.getClients = async (req, res) => {
  const clients = await Client.find({ createdBy: req.user.id });
  res.json(clients);
};

//  POst 
exports.createClient = async (req, res) => {
  const { name, email, phone, company } = req.body;
  const client = new Client({ name, email, phone, company, createdBy: req.user.id });
  await client.save();
  res.status(201).json(client);
};

// PUT 
exports.updateClient = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Client.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Client non trouvé' });
    res.json({ message: 'Client mis à jour', client: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//  DELETE 
exports.deleteClient = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Client.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: 'Client non trouvé' });
    res.json({ message: 'Client supprimé avec succès' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


