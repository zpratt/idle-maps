/**
 * @jsx React.DOM
 */

'use strict';

var MapLoader = require('async-google-maps').MapLoader,
    GoogleMapsMixin = require('./google-maps-mixin'),

    React = require('react');

function applyMixin(mixinToApply, targetObject) {
    var mixinProps = Object.keys(mixinToApply),
        currentProp,
        propIndex;

    for (propIndex = 0; propIndex < mixinProps.length; propIndex += 1) {
        currentProp = mixinProps[propIndex];
        targetObject[currentProp] = mixinToApply[currentProp];
    }

    return targetObject;
}

module.exports = applyMixin(GoogleMapsMixin, {
    componentDidMount: function () {
        MapLoader.create(this.getDOMNode(), this.props.mapOptions).then(function (map) {
            this.idle(map);
        }.bind(this));
    },
    render: function () {
        return (
            <div className="map-container">
                <div className="test"></div>
            </div>
        );
    }
});
