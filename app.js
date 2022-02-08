const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const ShortUrl = require('./models/url')
const port = 3000

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
    ShortUrl.find({}, (err, data) => {
        if (!err) {
            res.send(data)
        } else {
            console.log(err);
        }
    })
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

// app.post('/short', (req, res) => {
//     const fullUrl = req.body.fullUrl
//     console.log('URL requested: ', fullUrl)

//     const record = new ShortUrl({
//         full: req.body.fullUrl
//     })

//     record.save((err, data) => {
//         if (!err) {
//             res.send(data)
//         } else {
//             console.log(err)
//         }
//     })
//     res.redirect('/')
// })

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

