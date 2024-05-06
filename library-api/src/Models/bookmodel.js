const mongoose = require('mongoose')

const bookSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    author: {
        type: String,
        required: true 
    },
    genre: { 
        type: String, 
        required: true 
    },
    publishedYear: { 
        type: Number, 
        required: true 
    },
    pageCount: { 
        type: Number, 
        required: true 
    },
    description: String,
    createdAt: { type: Date, default: Date.now }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
