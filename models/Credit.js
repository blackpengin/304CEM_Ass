const { string } = require('@hapi/joi');
const mongoose = require('mongoose');


const CreditSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        min: 0,
        required: true
    }
})


module.exports = mongoose.model('Credits', CreditSchema);