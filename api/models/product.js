const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number
})

module.exports = mongoose.model('Product',ProductSchema);