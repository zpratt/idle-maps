/**
 * @jsx React.DOM
 */

'use strict';

var IdleMaps = require('../dist/idle-maps'),
    React = require('react'),
    OverlayMixin = IdleMaps.OverlayViewMixin;

module.exports = React.createClass({
    mixins: [OverlayMixin],
    render: function () {
        var overlayStyle = {
            backgroundColor: '#FFF',
            border: '1px solid #000'
        };

        return (
            <div className="overlay-sob" style={overlayStyle}>
                <p>
                    {this.props.message}
                </p>
            </div>
        );
    }
});
