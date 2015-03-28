/**
 * @jsx React.DOM
 */

'use strict';

var IdleMaps = require('../dist/idle-maps'),
    React = require('react'),

    GoogleMapsApiMixin = IdleMaps.GoogleMapsApiMixin,
    MapMixin = IdleMaps.MapInstanceMixin,

    OverlayComponent = require('./overlay-component.jsx');

function createOverlay(map) {
    var point = {
            lat: 40.22,
            lng: -90.11
        };

    return (
        <OverlayComponent point={point} map={map} message="First" />
    );
}

module.exports = React.createClass({
    mixins: [GoogleMapsApiMixin, MapMixin],
    idle: function (map) {
        var OverlayElement = createOverlay(map);

        React.render(OverlayElement, document.createElement('div'));
    }
});
