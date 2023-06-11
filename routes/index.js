const usersRouter = require('./users');
const productRouter = require('./products');
const categoriesRouter = require('./categories');
const authRouter = require('./auth');
const billRouter = require('./bill');
const billDetailRouter = require('./bill-detail');
const commentRouter = require('./comment');

function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/products', productRouter);
  app.use('/api/categories', categoriesRouter);
}

module.exports = routes;
