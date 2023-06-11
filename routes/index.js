const usersRouter = require('./users');
const productRouter = require('./products');
const categoriesRouter = require('./categories');
const authRouter = require('./auth');
const billRouter = require('./bills');
const billDetailRouter = require('./bill-details');
const commentRouter = require('./comments');
const customerRouter = require('./customers');
function routes(app) {
  app.use('/api/auth', authRouter);
  app.use('/api/users', usersRouter);
  app.use('/api/products', productRouter);
  app.use('/api/categories', categoriesRouter);
  app.use('/api/bills', billRouter);
  app.use('/api/bill-details', billDetailRouter);
  app.use('/api/comments', commentRouter);
  app.use('/api/customers', customerRouter);
}

module.exports = routes;
