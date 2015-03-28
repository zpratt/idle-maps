(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["IdleMaps"] = factory(require("react"));
	else
		root["IdleMaps"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var GoogleMapsApiMixin = __webpack_require__(1),
	    MapInstanceMixin = __webpack_require__(3),
	    OverlayViewMixin = __webpack_require__(2);

	module.exports = {
	    GoogleMapsApiMixin: GoogleMapsApiMixin,
	    MapInstanceMixin: MapInstanceMixin,
	    OverlayViewMixin: OverlayViewMixin
	};


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MapLoader = __webpack_require__(4).MapLoader;

	module.exports = {
	    componentWillMount: function () {
	        MapLoader.load({
	            key: this.props.apiKey,
	            version: this.props.apiVersion
	        });
	    }
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var OverlayFactory = __webpack_require__(4).BaseOverlayFactory;

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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * @jsx React.DOM
	 */

	'use strict';

	var MapLoader = __webpack_require__(4).MapLoader,

	    React = __webpack_require__(5);

	module.exports = {
	    componentDidMount: function () {
	        MapLoader.create(this.getDOMNode(), this.props.mapOptions).then(function (map) {
	            this.idle(map);
	        }.bind(this));
	    },
	    render: function () {
	        return (
	            React.createElement("div", {className: "map-container"}, 
	                React.createElement("div", {className: "test"})
	            )
	        );
	    }
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @author zach pratt
	 * @licence MIT
	 * @module async-google-maps
	 */

	var MapLoader = __webpack_require__(6),
	    BaseOverlayFactory = __webpack_require__(7);

	module.exports = {
	    /**
	     * See {@link async-google-maps/map-loader}
	     * */
	    MapLoader: MapLoader,
	    /**
	     * See {@link async-google-maps/base-overlay-factory}
	     * */
	    BaseOverlayFactory: BaseOverlayFactory
	};


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	/**
	 * @module async-google-maps/map-loader
	 */

	var URL_PREFIX = '//maps.googleapis.com/maps/api/js',
	    CALLBACK_IDENTIFIER = 'mapLoaded',

	    mapLoadedDeferred,
	    mapLoadedPromise;

	global[CALLBACK_IDENTIFIER] = function mapLoaded() {
	    mapLoadedDeferred.resolve();
	};

	function buildUrl(options) {
	    return URL_PREFIX
	        + '?v=' + options.version
	        + '&key=' + options.key
	        + '&callback=' + CALLBACK_IDENTIFIER;
	}

	function createDeferredToAllowForResolutionAfterGoogleMapsLoaderFinishes(resolve, reject) {
	    mapLoadedDeferred = {
	        resolve: resolve,
	        reject: reject
	    };
	}

	function createMapLoadedPromise() {
	    mapLoadedPromise = new Promise(function (resolve, reject) {
	        createDeferredToAllowForResolutionAfterGoogleMapsLoaderFinishes(resolve, reject);
	    });
	}

	function appendScriptOnDocumentReady(scriptEl) {
	    document.addEventListener('DOMContentLoaded', function () {
	        document.head.appendChild(scriptEl);
	    });
	}

	function injectGoogleMapsScript(options) {
	    var scriptEl = document.createElement('script');
	    scriptEl.src = buildUrl(options);
	    scriptEl.type = 'text/javascript';

	    appendScriptOnDocumentReady(scriptEl);
	}

	function init() {
	    createMapLoadedPromise();
	}

	init();

	module.exports = {
	    /**
	     * Asynchronously loads the google maps javascript library, given the supplied options.
	     * Returns a promise that will be resolved once the google maps loader has finished.
	     * Once the promise resolves, it is safe to reference anything under the `google.maps` namespace.
	     * This method should only be called once for a given application.
	     *
	     * @param {Object} options - The configuration used to load the google maps API
	     * @param {string} options.version - The version of the google maps API to load
	     * @param {string} options.key - The API key of the consuming application
	     * @returns {Promise}
	     * */
	    load: function loadGoogleMapsAsync(options) {
	        injectGoogleMapsScript(options);

	        return mapLoadedPromise;
	    },

	    /**
	     * @property {Promise} loaded - A reference to a promise that is resolved once the google maps API is ready.
	     */
	    loaded: (function () {
	        return mapLoadedPromise;
	    }()),

	    /**
	     * Creates a map instance given the supplied options. The options will be passed into the `google.maps.Map` constructor,
	     * therefore, all options from the [google maps api](https://developers.google.com/maps/documentation/javascript/reference#MapOptions) can be used.
	     * This function returns a promise which will be resolved once the newly created map instance is in the `idle` state,
	     * which is the point at which overlays, markers, and geometries can be added to the map.
	     *
	     * @param mapContainer - The element to attach the map instance to
	     * @param options - Options passed to the google Map constructor
	     * @returns {Promise}
	     * */
	    create: function createMap(mapContainer, options) {
	        return new Promise(function mapIdleResolver(resolve) {
	            mapLoadedPromise.then(function whenMapHasLoaded() {
	                var googleMaps = __webpack_require__(8),
	                    mapInstance = new googleMaps.maps.Map(mapContainer, options);

	                googleMaps.maps.event.addListenerOnce(mapInstance, 'idle', function mapIdleHandler() {
	                    resolve(mapInstance);
	                });
	            });
	        });
	    }
	};

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @module async-google-maps/base-overlay-factory
	 */

	var MapLoader = __webpack_require__(6);

	module.exports = {
	    /**
	     * Creates an instance of a custom overlay that will position itself on the map based on the overlay dimensions
	     * and the provided point.
	     *
	     * @param options - Options passed to the base overlay constructor
	     * @param options.el - The element that the overlay will use to append into the overlay pane.
	     * @param options.point - The lat/lng that the overlay will use to position itself on the map.
	     */
	    create: function (options) {
	        MapLoader.loaded.then(function () {
	            var BaseOverlay = __webpack_require__(9),
	                overlayInstance = new BaseOverlay(options);

	            overlayInstance.setMap(options.map);
	        });
	    }
	};


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	module.exports = global.google;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {'use strict';

	var google = global.google;

	function onAdd() {
	    var panes = this.getPanes();

	    panes.overlayLayer.appendChild(this.el);
	}

	function positionOverlayByDimensions(projectedLatLng) {
	    var offsetHeight = this.el.offsetHeight,
	        offsetWidth = this.el.offsetWidth;

	    this.el.style.top = projectedLatLng.y - offsetHeight + 'px';
	    this.el.style.left = projectedLatLng.x - Math.floor(offsetWidth / 2) + 'px';
	}

	function draw() {
	    var projection = this.getProjection(),
	        projectedLatLng = projection.fromLatLngToDivPixel(this.point);

	    positionOverlayByDimensions.call(this, projectedLatLng);
	}

	function BaseOverlay(options) {
	    var point = options.point;

	    this.el = options.el;
	    this.point = new google.maps.LatLng(point.lat, point.lng);

	    this.el.style.position = 'absolute';
	}

	BaseOverlay.prototype = Object.create(google.maps.OverlayView.prototype);
	BaseOverlay.prototype.constructor = BaseOverlay;

	BaseOverlay.prototype.onAdd = onAdd;
	BaseOverlay.prototype.draw = draw;

	module.exports = BaseOverlay;

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ])
});
;