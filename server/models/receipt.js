const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const receiptSchema = new Schema({
    med: {
        type: Schema.Types.ObjectId,
        ref: 'Medicine'
    },
    ingr: {
        type: Schema.Types.ObjectId,
        ref: 'Ingredient'
    },
    mass: String
});

module.exports = mongoose.model('Receipt', receiptSchema);
