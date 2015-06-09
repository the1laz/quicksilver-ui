var React = require('react');
var ThingData = require('./ThingData');
var ThingAPI = require('./utils/ThingAPI');
var FluxThingApp = require('./components/FluxThingApp.react');
var Sitemap = require('./components/ListSitemap.react');

ThingAPI.init();

React.render(<Sitemap source='test'/>,
	document.getElementById('ui-sitemap')
);