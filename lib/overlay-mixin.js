'use strict';

var OverlayFactory = require('async-google-maps').BaseOverlayFactory;

module.exports = {
    componentDidMount: function () {
        var element = this.getDOMNode();

        OverlayFactory.create({
            point: this.props.point,
            el: element,
            map: this.props.map
        });
    }
};
