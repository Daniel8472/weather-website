const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define paths for express config.
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//set up handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//set up static directory to serve 
app.use(express.static(publicDirectoryPath))

app.get( '', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'daniel bamford'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Dan the Man bamford'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMsg: 'Help is for the weak.',
        title: 'Help',
        name: 'Dan bamford'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    
    geocode(req.query.address,(error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error: error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error: error})
            }
    
            res.send({
                forecast: forecastData.summary + ' It is currently ' + forecastData.temp + ' degrees with a ' + forecastData.rain + '% chance of rain',
                location: location,
                address: req.query.address
            })
          })


    })


})

app.get('/products', (req, res) => {
    if (!req.query.search) {
       return res.send({
            error: 'You musr provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help article not found.',
        name: 'daniel bammybambam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not found.',
        name: 'daniel bammybambam'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})