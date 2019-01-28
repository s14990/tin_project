const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isvalidated: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        default: 'offline'
    },
    rank: {
        type: String,
        default: 'user'
    }
});

module.exports = mongoose.model('User', userSchema);