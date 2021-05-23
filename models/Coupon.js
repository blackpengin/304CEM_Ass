const { number } = require('@hapi/joi');
const mongoose = require('mongoose');


const CouponSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    from: {
        type: Date,
        default: Date.now,
        required: true
    },
    to: {
        type: Date,
        required: true
    },
    discount: {
        type: Number,
        min: 1,
        max: 100,
        required: true
    },
    permission:{
        type: String,
        required: true
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Coupons', CouponSchema);