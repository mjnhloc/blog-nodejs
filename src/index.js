const path = require('path')
const express = require('express')
const { engine } = require('express-handlebars')
const morgan = require('morgan')
const route = require('./routes')

const app = express()
const port = 3000

// body parse
app.use(
    express.urlencoded({
        extended: true,
    }),
)
app.use(express.json())

app.use(express.static(path.join(__dirname, 'public')))

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
    'hbs',
    engine({
        extname: '.hbs',
    }),
)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'resources/views'))

// Routes init
route(app)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
