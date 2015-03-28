/**
 * @jsx React.DOM
 */

'use strict';

var MapLoader = require('async-google-maps').MapLoader,

    React = require('react');

module.exports = {
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
};
