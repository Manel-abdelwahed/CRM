const mongoose = require('mongoose');

const clientSchema = new mongoose.Schema({
  N: Number,
  nom: String,
  gouvernorat: String,
  region: String,
  telephone: String,
  besoin: String,
  source: String,
  dc: String,
  commercial: String,
  da: String,
  observation: String,
  rappel: String,
  puissance_ch: String,
  prix: String,
  subvention: String,
  modalites_paiement: String,
  contact1: String,
  contact2: String,
  contact3: String,
}, {
  timestamps: true
});

module.exports = mongoose.model('Client', clientSchema);

