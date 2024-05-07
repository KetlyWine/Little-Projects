const express = require('express')
const mongoose = require('mongoose')
const routerBook = require('../src/routes/bookRoutes.js')
require('dotenv').config();

const app = express()
app.use(express.json())
const port = process.env.PORT || 3000

app.use(routerBook)

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log('Connected to database')
    app.listen(port, () => {
        console.log(`Funcionando na porta ${port}`)
    })
}).catch(() => {
    console.log('Connection failed')
})

