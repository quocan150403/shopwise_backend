const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/Auth');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/logout', AuthController.logout);
router.post('/refresh-token', AuthController.refreshToken);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', AuthController.changePassword);

module.exports = router;
