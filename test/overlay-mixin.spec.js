'use strict';

var OverlayMixin = require('../lib/overlay-mixin'),
    BaseOverlayFactory = require('async-google-maps').BaseOverlayFactory,

    React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),

    sinon = require('sinon'),

    ComponentWithMixin,
    ElementWithMixin,

    fakeMap,
    fakeLatLngLiteral,
    sandbox;

function createFixtures() {
    fakeMap = {
        fake: 'map'
    };

    fakeLatLngLiteral = {
        fake: 'LatLng'
    };
}
describe('Google Maps Overlay View Mixin Test Suite', function () {
    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        createFixtures();

        sandbox.stub(BaseOverlayFactory, 'create');

        ComponentWithMixin = React.createClass({
            mixins: [OverlayMixin],

            render: function () {
                return React.DOM.div();
            }
        });

        ElementWithMixin = React.createElement(ComponentWithMixin, {
            map: fakeMap,
            point: fakeLatLngLiteral
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should bind the DOM node of the component to the overlay', function () {
        var renderedComponent = ReactTestUtils.renderIntoDocument(ElementWithMixin),
            componentElement = renderedComponent.getDOMNode();

        sinon.assert.calledOnce(BaseOverlayFactory.create);
        sinon.assert.calledWith(BaseOverlayFactory.create, {
            point: fakeLatLngLiteral,
            el: componentElement,
            map: fakeMap
        });
    });
});
