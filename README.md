# React Map Visualizations

This project demonstrates how to use the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) in React. This project requires no additional packages, only a Google API key linked to the Maps Javascript API. The React components are intended to be portable and embeddable.


## Requirements
This is a React app which requires [Node.js](https://nodejs.org/en/) to run. You can verify Node installation on the command line.

```
node -v
```

##  GeoJSON
This app uses geojson files to build data layers on top of Google Maps. There are several sample JSON files provided in `src/data`, including the letters GOOGLE overlayed over the continent of Australia, and food desert polygons overlayed on the county of Los Angeles. Any data can be visualized, if it is converted to geoJSON format. Note in the sample code below that the last coordinate must be the same as the first coordinate.

```
{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "color": "blue",
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [123.61, -22.14], [122.38, -21.73], [121.06, -21.69], [119.66, -22.22], [119.00, -23.40], [123.61, -22.14]
          ]
        ]
      }
    },
```

## Setup
Create a file named `.env` in the base directory. Paste the following code into the file `.env`, replacing YOURAPIKEY with a Google Maps Javascript API key.

```
REACT_APP_API_KEY = 'YOUR_MAPS_JS_API_KEY'
```

Add the file `.env` to the `.gitignore`.

```
# api keys
.env
```

The repository file structure should resemble:

```
+- public
+- src
	+- data
		+- la_deserts.json
	+- Map.js
+- .env
```

## Building
On the command line, navigate to the lowest level of the repository. The following command will serve the app on the local network:

```
npm start
```


## Credit
Setting up this repository was made possible by the great community of programmers who have posted their solutions on the web.

- [Google Maps JS API in React](https://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/)
- [Working with JSON in Javascript](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript)
- [How to Hide API Keys](https://medium.com/better-programming/how-to-hide-your-api-keys-c2b952bc07e6)
- [Clickable GeoJSON Map](https://stackoverflow.com/a/54323694/9080991)