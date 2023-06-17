const mongoose = require('mongoose');

const Product = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  slug: { type: String, required: true, unique: true },
  urlImg: { type: String, required: true },
  price: { type: Number, required: true },
  priceOld: { type: Number, default: 0 },
  rating: { type: Number, default: 0 },
  special: { type: Boolean, default: false },
  view: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  stock: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', Product);
