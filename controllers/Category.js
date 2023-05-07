const mongoose = require('mongoose');
const Category = require('../models/category');

class CategoryController {
  // [GET] categories/
  async getAll(req, res, next) {
    try {
      const data = await Category.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] categories/:id
  async getCategoryById(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    try {
      const data = await Category.findById(id);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new CategoryController();
