var React = require('react');
var ThingStore = require('../stores/ThingStore');
var FluxThingList = require('./FluxThingList.react');
var FluxThing = require('./FluxThing.react');

// Method to retrieve state from Stores
function getThingState() {
  
  var b = [{thing:'cbus-254-56-61',item:'level'},{thing:'mesh-099',item:'voltage'}];
  var c = b.map(function(t){
      return ThingStore.getItem(t.thing,t.item);
  });
  
  return {items:c};
}

// Define main Controller View
var FluxThingApp = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    return getThingState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ThingStore.addChangeListener(this._onChange);
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    ThingStore.removeChangeListener(this._onChange);
  },

  // Render our child components, passing state via props
  render: function() {
  
  	return (
      <div className="flux-thing-app">
        <FluxThingList items={this.state.items} />
      </div>
  	);
  },

//icon
//name
//item

  // Method to setState based upon Store changes
  _onChange: function() {
    this.setState(getThingState());
    console.log(this.state);
        console.log('CHANGE');
  }

});

module.exports = FluxThingApp;