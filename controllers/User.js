const mongoose = require('mongoose');
const UserModel = require('../models/user');

class UserController {
  // [GET] users/
  async getAll(req, res, next) {
    try {
      const data = await UserModel.find();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  // [GET] users/:id
  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      const data = await UserModel.findById(id);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json(error);
    }
  }
}

module.exports = new UserController();
