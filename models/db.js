const mongoose = require('mongoose');
// Allow Promises
mongoose.Promise = global.Promise;
// Connection 
const local='mongodb://localhost:27017/Development?readPreference=primary&ssl=false';
const prod = 'mongodb://denotes:admin123@ds229258.mlab.com:29258/heroku_q5xxkr0p';
const atlas = "mongodb+srv://admin:admin@denotes.iemcb.mongodb.net/denotes?retryWrites=true&w=majority";


const globalUri='mongodb://germancutraro:germancutraro33@ds131551.mlab.com:31551/crud-mern';
mongoose.connect(atlas,{ useNewUrlParser: true });
// Validation
mongoose.connection
  .once('open', () => console.log('Connected to the database!'))
  .on('error', err => console.log('Error with the database!', err));