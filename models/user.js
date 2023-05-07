const mongoose = require('mongoose');

const User = new mongoose.Schema({
  role: { type: String, default: 'user' },
  username: { type: String },
  password: { type: String },
  email: { type: String },
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', User);
