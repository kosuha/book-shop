const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monthlyBooksSchema = mongoose.Schema({
    title: {
        type: String,
        maxlength: 100
    },
    writer: {
        type: String,
        maxlength: 50
    },
    publisher: {
        type: String,
        maxlength: 50
    },
    published: {
        type: Date
    },
    category: {
        type: String,
        maxlength: 50
    },
    binding: {
        type: String,
        maxlength: 50
    },
    pages: {
        type: Number
    },
    size: {
        type: Array
    },
    description: {
        type: String
    },
    images: {
        type: Array,
        default: []
    },
    isbn: {
        type: String,
        maxlength: 50
    }
}, { timestamps: true })

const MonthlyBooks = mongoose.model('MonthlyBooks', monthlyBooksSchema);

module.exports = { MonthlyBooks }