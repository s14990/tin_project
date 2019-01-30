const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    },
    number: Number
});

module.exports = user = mongoose.model('Order', orderSchema);

