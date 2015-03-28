'use strict';

var GoogleMapsApiMixin = require('./lib/google-maps-mixin'),
    MapInstanceMixin = require('./lib/map-instance-mixin.jsx'),
    OverlayViewMixin = require('./lib/overlay-mixin');

module.exports = {
    GoogleMapsApiMixin: GoogleMapsApiMixin,
    MapInstanceMixin: MapInstanceMixin,
    OverlayViewMixin: OverlayViewMixin
};
