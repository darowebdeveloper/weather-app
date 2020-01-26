const request = require('request');

const geocode = (address,  callback) => {
    const geoCodeUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiZGFyb3dlYmRldmVsb3BlciIsImEiOiJjazVycmh0ZmYwZ2N2M2Zvczk0NXZtY201In0.-ylE6hxqCjTJ1cB6K25E-Q';
    request({
        url: geoCodeUrl,
        json: true
    }, (err, res)=>{
        if(err) {
            callback('Unable to connect to Geo code services!');
        } else if (res.body.message || res.body.features.length === 0) {
            callback('Oop! Could not find the address!');
        } else {
            const latitude = res.body.features[0].center[1];
            const longitude = res.body.features[0].center[0];
            const location = res.body.features[0].place_name;
            callback(undefined, {
                latitude,
                longitude,
                location,
            });
        }
    });
};

module.exports = geocode;