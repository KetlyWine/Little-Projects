const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())
const port = 3030

const Film = mongoose.model('Film', { 
    title: String,
    description: String,
    image_url: String,
    traler_url: String
});

app.get('/', async (req, res) => {
    const films = await Film.find()
    return res.send(films)
})

app.delete('/:id', async(req, res) => {
    const film = await Film.findOneAndDelete(req.params.id)
    return res.send(film)
})

app.put('/:id', async(req, res) => {
    const film = await Film.findByIdAndUpdate(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        traler_url: req.body.traler_url
    }, {
        new: true
    })
    return res.send(film)
})

app.post('/', async (req, res) => {
    const film = new Film({
        title: req.body.title,
        description: req.body.description,
        image_url: req.body.image_url,
        traler_url: req.body.traler_url
    })

    await film.save()
    res.send(film)
})

app.listen(port, () => {
    console.log('Funcionando na porta ${port}')
})