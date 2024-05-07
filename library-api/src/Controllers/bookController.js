const Book = require('../Models/bookmodel.js')

const allBook = async (req, res) => {
    try{
        const books = await Book.find({})
        res.status(200).json(books)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
}

const getBook = async (req, res) => {
    try{
        const {id} = req.params
        const book = await Book.findById(id)
        res.status(200).json(book)
    } catch(err){
        res.status(500).json({ message: err.message })
    }
}

const createBook = async (req, res) => {
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
}

const updateBook = async (req, res) =>{
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
}

const deleteBook = async (req, res) =>{
    try{
        const book = await Book.findOneAndDelete(req.params.id)
        if(!book){
            return res.status(404).json({message: 'Book not found'})
        }
        res.status(200).json({message: 'Book deleted successfully'})

    } catch(err){
        res.status(500).json({message: err.message})
    }
}



module.exports = { 
    allBook,
    getBook,
    createBook,
    updateBook,
    deleteBook
}
