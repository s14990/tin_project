const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//const Medicine = require('../models/medicine.js');

const orderSchema = new Schema({
    med: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    status: String,
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = user = mongoose.model('Order', orderSchema);

