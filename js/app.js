var React = require('react');
var ThingData = require('./ThingData');
var ThingAPI = require('./utils/ThingAPI');
var FluxThingApp = require('./components/FluxThingApp.react');
var Sitemap = require('./components/ListSitemap.react');




//ThingData.init();

// Load Mock API Call
ThingAPI.init();
//ThingAPI.getThingData();

//ThingAPI.getItemData();
// Render FluxCartApp Controller View
// React.render(<FluxThingApp />,
// 	document.getElementById('flux-thing')
// );

React.render(<Sitemap source='test'/>,
	document.getElementById('ui-sitemap')
);