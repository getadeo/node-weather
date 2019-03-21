const request = require('request')

const geocode = (address, callback) => {
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiZ2V0YWRlbyIsImEiOiJjanQ1ajZ6YTIwNmV2NDRwZGdiOXM2NXoyIn0.-p2jNF4TTkStFCnzgfli3w&limit=1'

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      const errorMessage = 'Unable to connect to location services!'
      callback(errorMessage, undefined)
    } else if (body.features.length === 0) {
      const errorMessage = 'Unable to find location. Try another search.'
      callback(errorMessage, undefined)
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      })
    }
  })
}

module.exports = geocode
