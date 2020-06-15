import React, { Component } from 'react';


/* Import data */
import deserts from './data/la_deserts.json';

var map;
var infowindow;

class Map extends Component {
    constructor(props) {
        super(props);
        this.onScriptLoad = this.onScriptLoad.bind(this)
    }

    onScriptLoad() {
        // CREATE YOUR GOOGLE MAPS
        map = new window.google.maps.Map(
          document.getElementById('map'),
           {
                // ADD OPTIONS LIKE STYLE, CENTER, GESTUREHANDLING, ...
                center: { lat: 33.885348, lng: -118.207343 },
                zoom: 10,
                gestureHandling: 'greedy',
                disableDefaultUI: true,
            });

        infowindow = new window.google.maps.InfoWindow();
    }

    constructInfoWindow(county, pop) {
        var html = `<div style='width:150px; text-align: center;'>
                        <table style="width:100%">
                          <tr>
                            <td>County</td>
                            <td>` + county + `</td>
                          </tr>
                          <tr>
                            <td>Population</td>` + 
                            `<td>` + pop + `</td>` +
                          `</tr>
                        </table>`

        return html
    }

    configureMap() {
        /* reference to map */
        var self = this

        /* Add GeoJSON layer */
        map.data.addGeoJson(deserts);

        /* Set coloring */
        map.data.setStyle(function(feature) {
            var color = feature.getProperty('color');

            return /** @type {!google.maps.Data.StyleOptions} */({
                fillColor: color,
                strokeColor: color,
                strokeWeight: 2
            });
        });

        /* When mouse over, change polygon */
        map.data.addListener('mouseover', (event) => {
            map.data.revertStyle();
            map.data.overrideStyle(event.feature, {strokeWeight: 1, fillOpacity: 0.1 });
        });

        /* When mouse out, revert polygon */
        map.data.addListener('mouseout', (event) => {
            map.data.revertStyle();
        });


        /* When the user clicks, open an infowindow */
        map.data.addListener('click', function (event) {

            /* feature properties */
            var county = event.feature.getProperty("county");
            var pop = event.feature.getProperty("population");

            var html = self.constructInfoWindow(county, pop)

            // logging
            console.log(html)

            infowindow.setContent(html);
            infowindow.setPosition(event.latLng);
            infowindow.setOptions({
                pixelOffset: new window.google.maps.Size(0, -30)
            });
            infowindow.open(map);
            
        });


    }


    componentDidMount() {
        if (!window.google) {
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_API_KEY;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            
            /* API not loaded, callback after loading*/
            s.addEventListener('load', e => {
                this.onScriptLoad()
                this.configureMap()
            })

        } else {
            /* API script already loaded */
            this.onScriptLoad()
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id={'map'} />
        );
    }
}

export default Map