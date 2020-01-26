const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const urlForecast = 'https://api.darksky.net/forecast/ab322d5a9171b87c56e7b85a2ab043bb/' + latitude + ',' + longitude + '?units=si';
    request({
        url: urlForecast,
        json: true,
    }, (err, { body }) => {
        if(err) {
            callback('Unable to connect to weather forecast services!');
        } else if (body.error) {
            callback('Oop! Could not find the weather forecast');
        } else {
            callback(undefined, 
                body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.'
            )
        }
    });
};

module.exports = forecast;