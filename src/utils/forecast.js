const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/251245b77767b7fd10f7c6255ba7dfd4/${latitude},${longitude}`
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      const errorMessage = 'Unable to connect to weather service!'
      callback(errorMessage, undefined)
    } else if (body.error) {
      const errorMessage = 'Unable to find location'
      callback(errorMessage, undefined)
    } else {
      const temperature = body.currently.temperature
      const chanceOfRain = body.currently.precipProbability
      callback(undefined, `${body.daily.data[0].summary} It is currently ${temperature} degrees out. There is a ${chanceOfRain}% chance of rain.`)
    }
  })
}

module.exports = forecast
