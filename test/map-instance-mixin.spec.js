'use strict';

var MapMixin = require('../lib/map-instance-mixin.jsx'),

    MapLoader = require('async-google-maps').MapLoader,

    React = require('react'),
    ReactTestUtils = require('react/lib/ReactTestUtils'),

    sinon = require('sinon'),
    expect = require('chai').expect,

    ComponentWithMixin,
    ElementWithMixin,

    expectedMapOptions,
    mapIdleCallback,
    idleSpy,

    fakeMapInstance,
    sandbox;

function createFixtures() {
    expectedMapOptions = {
        some: 'key'
    };

    fakeMapInstance = {
        fake: 'map'
    };
}
function setupStubs() {
    sandbox.stub(MapLoader, 'create')
        .returns({
            then: function (callback) {
                mapIdleCallback = callback;
            }
        });

    idleSpy = sandbox.spy();
}
describe('Google Map Instance Mixin Test Suite', function () {
    beforeEach(function () {
        sandbox = sinon.sandbox.create();

        setupStubs();
        createFixtures();

        ComponentWithMixin = React.createClass({
            mixins: [MapMixin],

            idle: idleSpy
        });

        ElementWithMixin = React.createElement(ComponentWithMixin, {
            mapOptions: expectedMapOptions
        });
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('should create a container for the google map instance', function () {
        var renderedElement = ReactTestUtils.renderIntoDocument(ElementWithMixin),
            domNode = renderedElement.getDOMNode();

        expect(domNode.className).to.equal('map-container');
    });

    it('should create a container for the google map instance', function () {
        var renderedElement;

        sinon.assert.notCalled(MapLoader.create);

        renderedElement = ReactTestUtils.renderIntoDocument(ElementWithMixin);

        sinon.assert.calledOnce(MapLoader.create);
        sinon.assert.calledWith(MapLoader.create, renderedElement.getDOMNode(), expectedMapOptions);
    });

    it('should notify the component extended with the mixin when the map is idle', function () {
        sinon.assert.notCalled(idleSpy);

        ReactTestUtils.renderIntoDocument(ElementWithMixin);

        mapIdleCallback(fakeMapInstance);

        sinon.assert.calledOnce(idleSpy);
        sinon.assert.calledWith(idleSpy, fakeMapInstance);
    });
});
