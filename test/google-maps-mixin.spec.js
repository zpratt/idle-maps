'use strict';

var GoogleMapsMixin = require('../lib/google-maps-mixin'),

    MapLoader = require('async-google-maps').MapLoader,

    React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),

    sinon = require('sinon'),

    expectedApiKey,
    expectedApiVersion,
    ComponentWithMixin,
    ElementWithMixin,
    sandbox;

describe('Google Maps API Mixin Test Suite', function () {
    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        sandbox.stub(MapLoader, 'load');

        ComponentWithMixin = React.createClass({
            mixins: [GoogleMapsMixin],

            render: function () {
                return React.DOM.div();
            }
        });

        expectedApiKey = 'somekey';
        expectedApiVersion = 'someversion';

        ElementWithMixin = React.createElement(ComponentWithMixin, {
            apiKey: expectedApiKey,
            apiVersion: expectedApiVersion
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should load the map with the provided api key and version', function () {
        sinon.assert.notCalled(MapLoader.load);

        ReactTestUtils.renderIntoDocument(ElementWithMixin);

        sinon.assert.calledOnce(MapLoader.load);
        sinon.assert.calledWith(MapLoader.load, {
            key: expectedApiKey,
            version: expectedApiVersion
        });
    });
});
