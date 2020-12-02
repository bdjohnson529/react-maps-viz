import React, { Component } from 'react';
import deserts from './data/ca-zips.json';


class Map extends Component {
    constructor(props) {
        super(props);

        // public field declarations
        var map;
        var infowindow;

        // bindings
        this.constructMap = this.constructMap.bind(this);
        this.getInfoWindowHTML = this.getInfoWindowHTML.bind(this);

    }

    constructMap() {
        // generate new map
        this.map = new window.google.maps.Map(
          document.getElementById('map'),
           {
                center: { lat: 33.885348, lng: -118.207343 },
                zoom: 10,
                gestureHandling: 'greedy',
                disableDefaultUI: true,
            });

        // generate new infowindow
        this.infowindow = new window.google.maps.InfoWindow();

    }

    constructDataLayer() {

        // add GeoJSON layer
        this.map.data.addGeoJson(deserts);

        // set coloring
        this.map.data.setStyle(function(feature) {
            var color = feature.getProperty('color');

            return ({
                fillColor: color,
                strokeColor: color,
                strokeWeight: 2
            });
        });
    }

    getInfoWindowHTML(county, pop, zipCode) {
        // formatted table
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
                          <tr>
                            <td>Zip Code</td>` + 
                            `<td>` + zipCode + `</td>` +
                          `</tr>
                        </table>`

        return html
    }

    configureListeners() {
        var self = this;


        // when mouse over, change polygon
        this.map.data.addListener('mouseover', (event) => {
            this.map.data.revertStyle();
            this.map.data.overrideStyle(event.feature, {strokeWeight: 1, fillOpacity: 0.1 });
        });

        // when mouse out, revert polygon
        this.map.data.addListener('mouseout', (event) => {
            this.map.data.revertStyle();
        });


        // when the user clicks, open an infowindow
        this.map.data.addListener('click', function (event) {

            // feature properties
            var county = event.feature.getProperty("county");
            var pop = event.feature.getProperty("population");
            var zipCode = event.feature.getProperty("zip");

            var html = self.getInfoWindowHTML(county, pop, zipCode)


            // configure info window
            self.infowindow.setContent(html);
            self.infowindow.setPosition(event.latLng);
            self.infowindow.setOptions({
                pixelOffset: new window.google.maps.Size(0, -30)
            });

            self.infowindow.open(this.map);
            
        });
    }


    componentDidMount() {
        if (!window.google) {

            console.log("manual load");

            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.src = 'https://maps.googleapis.com/maps/api/js?key=' + process.env.REACT_APP_API_KEY;
            var x = document.getElementsByTagName('script')[0];
            x.parentNode.insertBefore(s, x);
            
            // callback after API loaded
            s.addEventListener('load', e => {
                this.constructMap();
                this.constructDataLayer();
                this.configureListeners();
            })

        } else {
            // no callback necessary
            this.constructMap();
            this.constructDataLayer();
            this.configureListeners();
        }
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%' }} id={'map'} />
        );
    }
}

export default Map