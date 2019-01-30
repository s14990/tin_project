const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema({
    med: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    status: String,
    number: Number

});
module.exports = mongoose.model('Storage', orderSchema);