const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please add a name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Please add a password']
    },
    cartData: {
        type: Object,
        default: {}
    },

    isAdmin: {
        type: Boolean,
        default: false
    }
},{timestamps: true});

module.exports = mongoose.model('User', userSchema);