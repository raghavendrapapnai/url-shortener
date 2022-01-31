const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ShortUrl = require('./models/url')
const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
    const allData = await ShortUrl.find()
    res.send("Response from server")
    //logic to connect to angular
})

app.post('/short', async (req, res) => {
    const fullUrl = req.body.fullUrl
    console.log('URL requested: ', fullUrl)

    const record = new ShortUrl({
        full: fullUrl
    })

    await record.save()
    res.redirect('/')
})

app.get('/:shortid', async (req, res) => {
    const shortid = req.params.shortid
    const rec = await ShortUrl.findOne({ short: shortid })
    if (!rec) return res.sendStatus(404)
    await rec.save()
    res.redirect(rec.full)
})

mongoose.connect('mongodb://localhost/urlshortener', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Connected to MongoDB');
})

mongoose.connection.on('open', async () => {
    await ShortUrl.create({ full: 'https://www.google.co.in/' })

    app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
    })
})
