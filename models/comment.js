const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  content: { type: String, required: true },
  rating: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', Comment);
