const mongoose = require('mongoose')

//Member Schema
const memberSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
   birthday: {
        type: String,
        required: true
    },
    status: {
        type: String
    },
    body: {
        type: String
    }
})

const Member = module.exports = mongoose.model('Member', memberSchema)