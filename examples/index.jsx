/**
 * @jsx React.DOM
 */

'use strict';

var MapComponent = require('./map-component.jsx'),

    React = require('react'),
    MapElement;

function createMap() {
    var mapOptions = {
        center: {
            lat: 41.011,
            lng: -89.22
        },
        zoom: 7
    };

    return (
        <MapComponent
            apiKey="AIzaSyDSIvk8etmMk1JvZE38ziW_7S_wWad5qhw"
            apiVersion="3.20"
            mapOptions={mapOptions}
        />
    );
}

MapElement = createMap();

React.render(MapElement, document.querySelector('.content'));
