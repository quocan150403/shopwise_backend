const mongoose = require('mongoose');
const CustomerModel = require('../models/customer');

class CustomerController {
  // [GET] api/customers
  async getAll(req, res, next) {
    try {
      const data = await CustomerModel.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] api/customers/:id
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      const data = await CustomerModel.findById(req.params.id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [POST] api/customers/store
  async create(req, res, next) {
    try {
      const data = new CustomerModel(req.body);
      const savedCategory = await data.save();
      res.status(200).json(savedCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [PUT] api/customers/update/:id
  async update(req, res, next) {
    try {
      const data = await CustomerModel.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [DELETE] api/customers/delete/:id
  async delete(req, res, next) {
    try {
      await CustomerModel.findByIdAndDelete(req.params.id);
      res.status(200).json('Xóa thành công');
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new CustomerController();
