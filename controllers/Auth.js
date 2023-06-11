require('dotenv').config();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const RefreshTokenModel = require('../models/refresh-token');

class AuthController {
  async register(req, res, next) {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword)
      return res.status(400).json({ message: 'Please fill all the fields' });

    if (password !== confirmPassword)
      return res.status(400).json({ message: 'Password and confirm password not match' });

    try {
      const userExist = await UserModel.findOne({ $or: [{ username: username }, { email: email }] });
      if (userExist) return res.status(400).json('Username or phone already exist');
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(password, salt);
      const user = new UserModel(req.body);
      const savedUser = await user.save();
      res.status(200).json(savedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      const user = await UserModel.findOne({ $or: [{ username: username }, { email: username }] });
      if (!user) return res.status(404).json('User not found');
      const passwordMatch = bcrypt.compare(password, user.password);
      if (!passwordMatch) return res.status(400).json('Wrong password');
      const accessToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '30s' },
      );

      const refreshToken = jwt.sign(
        {
          id: user._id,
          role: user.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '365d' },
      );

      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      const refreshTokenModel = new RefreshTokenModel({ token: refreshToken });
      await refreshTokenModel.save();

      const { password: hashedPassword, ...info } = user._doc;
      res.status(200).json({ ...info, accessToken });
    } catch (error) {
      req.json;
    }
  }

  async refreshToken(req, res, next) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.status(401).json('You are not authenticated');

    const refreshTokenExist = await RefreshTokenModel.findOne({ token: refreshToken });
    if (!refreshTokenExist) return res.status(403).json('Refresh token not found');

    try {
      const verify = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if (!verify) return res.status(401).json('You are not authenticated');

      await RefreshTokenModel.deleteOne({ token: refreshToken });

      const newAccessToken = jwt.sign(
        {
          id: verify.id,
          role: verify.role,
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '30s' },
      );

      const newRefreshToken = jwt.sign(
        {
          id: verify.id,
          role: verify.role,
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: '365d' },
      );

      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'strict',
      });

      const refreshTokenModel = new RefreshTokenModel({ token: newRefreshToken });
      await refreshTokenModel.save();

      res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async logout(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      await RefreshTokenModel.findOne({ token: refreshToken });
      res.clearCookie('refreshToken', { path: '/' });
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const { currentPassword, newPassword, confirmPassword } = req.body;
      if (!currentPassword || !newPassword || !confirmPassword)
        return res.status(400).json({ message: 'Please fill all the fields' });
      if (newPassword !== confirmPassword)
        return res.status(400).json({ message: 'Password and confirm password not match' });

      const user = await UserModel.findById(req.user.id);
      const passwordMatch = bcrypt.compare(currentPassword, user.password);
      if (!passwordMatch) return res.status(400).json('Wrong password');

      user.password = newPassword;
      await user.save();
      res.status(200).json('Password changed successfully');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const { email } = req.body;
      if (!email) return res.status(400).json({ message: 'Please fill all the fields' });
      const user = await UserModel.findOne({ email: email });
      if (!user) return res.status(400).json('Email not found');

      const token = crypto.randomBytes(32).toString('hex');
      user.resetToken = token;
      user.expireToken = Date.now() + 3600000; // 1 hour
      await user.save();

      // Gửi email chứa liên kết đến trang đặt lại mật khẩu
      // const link = `${process.env.CLIENT_URL}/reset-password/${token}`;

      res.status(200).json('Reset password link sent to your email');
    } catch (error) {
      res.status(500).json(error);
    }
  }

  async resetPassword(req, res, next) {
    try {
      const { resetToken, password } = req.body;

      // Kiểm tra tính hợp lệ của mã đặt lại mật khẩu
      const user = await UserModel.findOne({
        resetToken,
        resetTokenExpiration: { $gt: Date.now() },
      });
      if (!user) {
        return res.status(400).json({ message: 'Mã đặt lại mật khẩu không hợp lệ hoặc đã hết hạn' });
      }

      // Lưu mật khẩu mới
      user.password = password;
      user.resetToken = undefined;
      user.resetTokenExpiration = undefined;
      await user.save();

      res.status(200).json({ message: 'Đặt lại mật khẩu thành công' });
    } catch (error) {
      res.status(500).json({ message: 'Đã xảy ra lỗi' });
    }
  }
}

module.exports = new AuthController();
