const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  name: { type: String },
  order: { type: Number },
  visible: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Category', Category);
