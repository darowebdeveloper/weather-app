const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

// set up directories for express config
const publicDirectory = path.join(__dirname, '../public');
const viewsDirectory = path.join(__dirname, '../templates/views');
const partialsDirectory = path.join(__dirname, '../templates/partials');

// set express setting; view engine using hbs and directory
app.set('view engine','hbs');
app.set('views', viewsDirectory);
hbs.registerPartials(partialsDirectory);

// serve public dir
app.use(express.static(publicDirectory));


// Route
app.get('', (req, res) => {
    // render view using the view engine 
    res.render('index', {
        title: 'WEATHER-APP',
        name: 'PHAN Daro', 
        text: 'Weather app'
    });
});
app.get('/weather', (req, res) => {
    const address = req.query.address;
    if(!address) {
        return res.send({
            error: 'Address is required!'
        });
    }
    geocode(address, (error, {latitude = 0, longitude = 0, location} = {}) => {
        if(error) {
            return res.send({
                error: error,
            })
        }
        forecast(latitude, longitude, (error, dataForecast) => {
            if(error) {
                return res.send({
                    error: error,
                });
            }
            res.send({
                forecast: dataForecast,
                location,
                address
            });
            
        });
    });
});
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'PHAN Daro',
        text: 'This is abour the Weather-App.'
    });
});
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'PHAN Daro',
        text: 'Nothing much! Just type the location, then you will get the forecast.',
    });
});
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Help page not found!',
        name: 'PHAN Daro'
    });
});
app.get('/*', (req, res) => {
    res.render('404', {
        title: '404',
        text: 'Page not found!',
        name: 'PHAN Daro'
    });
});
app.listen('4300', () => {
    console.log("Server starts at port: 4300.")
});