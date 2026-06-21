const mongoose = require('mongoose');

const blackListTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24, // 24 hours
  },
});

const BlackListToken = mongoose.model('BlackListToken', blackListTokenSchema);

module.exports = BlackListToken;