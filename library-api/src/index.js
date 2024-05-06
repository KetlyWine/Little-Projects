const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config();

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

const Book = mongoose.model('Book', { 
    title: String,
    author: String,
    genre: String,
    publishedYear: Number,
    pageCount: Number,
    description: String,
    createAt: { type: Date, default: Date.now }
});

app.get('/book', async (req, res) => {
    try{
        const books = await Book.find({})
        res.status(200).json(books)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

app.get('/book/:id', async (req, res) => {
    try{
        const { id } = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

app.post('/book', async (req, res) => {
    try{
        const book = await Book.create({
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear,
            pageCount: req.body.pageCount,
            description: req.body.description,
            createdAt: Date.now()
        });
        res.status(200).json(book)
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

app.put('/book/:id', async(req, res) => { 
    try{
        const { id } = req.params

        const book = await Book.findByIdAndUpdate(id, {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publishedYear: req.body.publishedYear,
            pageCount: req.body.pageCount,
            description: req.body.description
        }, { 
            new: true
        })

        if(!book) {
            return res.status(404).json({message: 'Book not found'})
        }

        const updatedBook = await Book.findById(id)
        res.status(200).json(updatedBook)
    }catch(err){
        res.status(500).json({message: err.message})
    }
    
})

app.delete('/book/:id', async(req, res) => {
    try{
        const book = await Book.findOneAndDelete(req.params.id)
        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }
        res.status(200).json({message: 'Book deleted successfully'})

    } catch(err){
        res.status(500).json({message: err.message})
    }
})

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log('Connected to database')
    app.listen(port, () => {
        console.log(`Funcionando na porta ${port}`)
    })
}).catch(() => {
    console.log('Connection failed')
})

