const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3000

const Book = mongoose.model('Book', { 
    title: String,
    author: String,
    genre: String,
    publishedYear: Number,
    pageCount: Number,
    description: String,
    createAt: { type: Date, default: Date.now }
});

app.get('/', async (req, res) => {
    try{
        const books = await Book.find({})
        res.status(200).json(books)
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



// app.delete('/:id', async(req, res) => {
//     const film = await Film.findOneAndDelete(req.params.id)
//     return res.send(film)
// })

// app.put('/:id', async(req, res) => {
//     const film = await Film.findByIdAndUpdate(req.params.id, {
//         title: req.body.title,
//         description: req.body.description,
//         image_url: req.body.image_url,
//         traler_url: req.body.traler_url
//     }, {
//         new: true
//     })
//     return res.send(film)
// })

// app.post('/', async (req, res) => {
//     const film = new Film({
//         title: req.body.title,
//         description: req.body.description,
//         image_url: req.body.image_url,
//         traler_url: req.body.traler_url
//     })

//     await film.save()
//     res.send(film)
// })

mongoose.connect('mongodb+srv://ketlywine:GwrXtzgN7qpq6yXk@cluster0.q4wkl4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to database')
    app.listen(port, () => {
        console.log(`Funcionando na porta ${port}`)
    })
}).catch(() => {
    console.log('Connection failed')
})

