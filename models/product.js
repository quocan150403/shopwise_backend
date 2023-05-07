const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Product = new mongoose.Schema({
  urlImg: { type: String },
  name: { type: String },
  price: { type: Number },
  priceOld: { type: Number },
  rating: { type: Number },
  sold: { type: Number, default: 0 },
  quantity: { type: Number, default: 0 },
  visible: { type: Boolean, default: true },
  categoryId: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Product', Product);
