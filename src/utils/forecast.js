const request = require('request')

const forecast = (a, b, callback) => {
    const url = 'https://api.darksky.net/forecast/19727542a0ae299c55cc6d0b7e5c70e2/' + encodeURIComponent(a)+ ',' + encodeURIComponent(b) +'?units=si'

    request({ url, json: true }, (error, { body } ) => {
        if (error) {
            callback('Unable to connect to weather services.')
        } else if (body.error) {
            callback('Unable to find location provided.')
        } else {
            callback(undefined, {
                temp: body.currently.temperature,
                rain: body.currently.precipProbability,
                summary: body.daily.data[0].summary,
                dailySummary: body.daily.data[1].summary,
                hourlySumm: body.minutely.summary,
                nextRain: body.hourly.data
            })
        }
    })
}

module.exports = forecast