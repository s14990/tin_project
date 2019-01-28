const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingrSchema = new Schema({
    ingr_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ingredient', ingrSchema);
