const express = require('express')
const mongoose = require('mongoose')

const port = 3000
const app = express()
app.use(express.json())



mongoose.connect('mongodb+srv://ketlywine:GwrXtzgN7qpq6yXk@cluster0.q4wkl4i.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
    console.log('Connected to database')
    app.listen(port, () => {
        console.log('Funcionando na porta ${port}')
    })
}).catch(() => {
    console.log('Connection failed')
})

