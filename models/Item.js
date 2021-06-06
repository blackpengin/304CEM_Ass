const mongoose = require('mongoose');


const ItemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    }
})


module.exports = mongoose.model('Items', ItemSchema);