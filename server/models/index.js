const mongoose= require('mongoose');

mongoose.set('debug',true)
mongoose.connect('mongodb://127.0.0.1:27017/tin',{ useNewUrlParser: true })
console.log("connected to database");

module.exports.User = require('./user');
module.exports.Ingredient = require('./ingredient');
module.exports.Medicine = require('./medicine');
module.exports.Receipt = require('./receipt');
module.exports.Order= require('./order');
module.exports.Storage=require('./storage');
module.exports.Price=require('./price');