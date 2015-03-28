'use strict';

var MapLoader = require('async-google-maps').MapLoader;

module.exports = {
    componentWillMount: function () {
        MapLoader.load({
            key: this.props.apiKey,
            version: this.props.apiVersion
        });
    }
};
