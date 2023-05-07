const mongoose = require('mongoose');
const UserModel = require('../models/user');

class UserController {
  // [GET] users/
  async getAll(req, res, next) {
    try {
      const data = await UserModel.find();
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }

  // [GET] users/:id
  async getOne(req, res, next) {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid product ID' });
    }
    try {
      const data = await UserModel.findById(id);
      res.json(data);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new UserController();
