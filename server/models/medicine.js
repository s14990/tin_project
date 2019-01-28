const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const medicSchema = new Schema({
    med_name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Medicine', medicSchema);
