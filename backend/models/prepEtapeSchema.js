const mongoose = require('mongoose');

const prepEtapeSchema = new mongoose.Schema({
  namePrepEtape: { type: String, required: true },
  numberEtape: { type: Number, required: true },
  instruction: { type: String, required: true }
});

module.exports = mongoose.model('PrepEtape', prepEtapeSchema);