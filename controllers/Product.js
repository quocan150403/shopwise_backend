const mongoose = require('mongoose');
const Product = require('../models/product');

class ProductController {
  // [GET] products/
  async getAll(req, res, next) {
    console.log('get all products');
    try {
      const data = await Product.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/:id
  async getProductById(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    try {
      const data = await Product.findById(id).populate('categoryId');
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/new
  async getNewProduct(req, res, next) {
    try {
      const data = await Product.find().sort({ createdAt: -1 }).limit(10);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/hot
  async getHotProduct(req, res, next) {
    try {
      const data = await Product.find().sort({ sold: -1 }).limit(10);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/view
  async getViewProduct(req, res, next) {
    try {
      const data = await Product.find().sort({ view: -1 }).limit(10);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/search/:keyword
  async getProductsByKeyword(req, res, next) {
    try {
      const { keyword } = req.params;
      const data = await Product.find({ name: { $regex: keyword, $options: 'i' } });
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/category/:id
  async getProductsByCategoryId(req, res, next) {
    const { id } = req.params;
    const category = await Product.find({ categoryId: id });
    res.json(category);
  }
}

module.exports = new ProductController();
