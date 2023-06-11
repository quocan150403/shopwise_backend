const mongoose = require('mongoose');

const Bill = new mongoose.Schema({
  payment: { type: String, required: true },
  shipping: { type: String, required: true },
  shoppingFee: { type: Number, required: true },
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  visible: { type: Boolean, default: true },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Bill', User);
