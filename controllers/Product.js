const mongoose = require('mongoose');
const unidecode = require('unidecode');
const ProductModel = require('../models/product');

class ProductController {
  // [GET] api/products
  async getAll(req, res, next) {
    try {
      const data = await ProductModel.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] api/products/:id
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      const data = await ProductModel.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
  // [GET] products/new
  async getNewProduct(req, res, next) {
    try {
      const data = await ProductModel.find().sort({ createdAt: -1 }).limit(8);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/hot
  async getHotProduct(req, res, next) {
    try {
      const data = await ProductModel.find().sort({ sold: -1 }).limit(8);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/view
  async getViewProduct(req, res, next) {
    try {
      const data = await ProductModel.find().sort({ view: -1 }).limit(8);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/search/:keyword
  async getProductsByKeyword(req, res, next) {
    try {
      const { keyword } = req.params;
      const data = await ProductModel.find({ name: { $regex: keyword, $options: 'i' } });
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] products/category/:id
  async getProductsByCategoryId(req, res, next) {
    const { id } = req.params;
    const category = await ProductModel.find({ categoryId: id });
    res.json(category);
  }

  // [POST] api/products/store
  async create(req, res, next) {
    try {
      req.body.slug = unidecode(req.body.name)
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/-+/g, '-');
      console.log(req.body);
      const data = new ProductModel(req.body);
      const savedCategory = await data.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [PUT] api/products/update/:id
  async update(req, res, next) {
    try {
      req.body.slug = unidecode(req.body.name)
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/-+/g, '-');
      const data = await ProductModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [DELETE] api/products/delete/:id
  async delete(req, res, next) {
    try {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Xóa thành công');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] api/products/rename
  async rename(req, res, next) {
    try {
      const result = await ProductModel.updateMany({}, { $rename: { inventory: 'stock' } });
      res.status(200).json(result);
    } catch (error) {
      console.error('Error renaming column:', error);
    }
  }
}

module.exports = new ProductController();
