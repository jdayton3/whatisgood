const express = require('express')
const morgan = require('morgan')
const stylus = require('stylus')
const nib = require('nib')
const path = require('path')
const app = express()
const port = process.env.PORT || 3000

const staticDir = 'static'

function compile(str, path) {
    return stylus(str)
        .set('filename', path)
        .use(nib())
}
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')
app.use(morgan('dev'))
app.use(stylus.middleware({
    src: path.join(__dirname, staticDir),
    compile: compile
}))
app.use(express.static(path.join(__dirname, staticDir)))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
