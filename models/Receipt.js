const mongoose = require('mongoose');

const ReceiptSchema = mongoose.Schema({
    buyer:{
        type: String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now
    },
    items:{
        type: mongoose.Schema.Types.ObjectId, ref: 'Items',
        min: 1,
        required: true
    },
    total_price:{
        type: Number,
        required: true
    },
    staff:{
        type: String,
        required: true
    }
})


module.exports = mongoose.model('Receipts', ReceiptSchema);