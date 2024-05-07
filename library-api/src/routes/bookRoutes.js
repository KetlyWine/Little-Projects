const express = require('express')
const routerBook = express.Router();
const { allBook, getBook, createBook, updateBook, deleteBook } = require('../Controllers/bookController.js');

routerBook.get('/book', allBook)
routerBook.get('/book/:id', getBook)
routerBook.post('/book', createBook)
routerBook.put('/book/:id', updateBook)
routerBook.delete('/book/:id', deleteBook)

module.exports = routerBook 