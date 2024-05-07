const mongoose = require('mongoose')
const {Schema} = mongoose

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
        required: true,
        default: 0, 
    },
    description: String,
    createdAt: { 
        type: Date, 
        default: Date.now 
    }
}, {
    timestamps: true,
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
