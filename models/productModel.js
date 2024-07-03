const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },
    product: {
        type: String,
      /*   required: [true, 'Please add an image'] */
    },

    new_price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    old_price: {
        type: Number,
        required: [true, 'Please add a price']
    },
    avilable: {
        type: Boolean,
       default: true
    },
    category: {
        type: String,
        required: [true, 'Please add a category']
    },
},{timestamps: true});

module.exports = mongoose.model('Product', productSchema);