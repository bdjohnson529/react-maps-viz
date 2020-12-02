# React Map Visualizations

This project demonstrates how to use the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/tutorial) in React. This project requires no additional packages, only a Google API key linked to the Maps Javascript API. The React components are intended to be portable and embeddable.


## Requirements
This is a React app which requires [Node.js](https://nodejs.org/en/) to run. You can verify Node installation on the command line.

```
node -v
```

## Setup
Create a file named `.env` in the base directory. Paste the following code into the file `.env`, replacing YOURAPIKEY with a Google Maps Javascript API key. By default, the `.env` file is added to `.gitignore` so the API key will not be committed to source control.

```
REACT_APP_API_KEY = 'YOUR_MAPS_JS_API_KEY'
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

## Usage
On the command line, navigate to the lowest level of the repository. The following commands will serve the app on the local network:

```
npm install
npm start
```

To deploy in Heroku, use the [Heroku buildpack](https://github.com/mars/create-react-app-buildpack). Change `mymapviz` to an appropriate title. The following code will deploy the React app to the endpoint https://mymapviz.herokuapp.com/.

```
heroku config:set REACT_APP_API_KEY=XXXXX-XXXXXX
heroku create mymapviz --buildpack mars/create-react-app
git push heroku master
heroku open
```

##  GeoJSON Polygons
This app uses geojson polygons to build data layers on top of Google Maps. A GeoJSON polygon is defined by a set of coordinates. We will use latitude and longitude to specify the coordinates.

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
            [x1, y1], [x2, y2], [x3, y3], [x4, y4]
          ]
        ]
      }
    },
```




## Credit
Setting up this repository was made possible by the great community of programmers who have posted their solutions on the web.

- [Google Maps JS API in React](https://cuneyt.aliustaoglu.biz/en/using-google-maps-in-react-without-custom-libraries/)
- [Working with JSON in Javascript](https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript)
- [How to Hide API Keys](https://medium.com/better-programming/how-to-hide-your-api-keys-c2b952bc07e6)
- [Clickable GeoJSON Map](https://stackoverflow.com/a/54323694/9080991)
