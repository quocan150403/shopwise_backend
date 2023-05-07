require('dotenv').config();
const mongoose = require('mongoose');
async function connect() {
  try {
    await mongoose.connect('mongodb://127.0.0.1/shopwise');
    console.log('Connect successfully!');
  } catch (error) {
    console.log(error);
  }
}

module.exports = { connect };
