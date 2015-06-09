var React = require('react');
var ThingStore = require('../stores/ThingStore');
var FluxThingList = require('./FluxThingList.react');
var FluxThing = require('./FluxThing.react');
var $ = require('jquery');
var _ = require('underscore');
var AutomationActions = require('../actions/AutomationActions');

var Button = require('react-bootstrap').Button;
var NavItem = require('react-bootstrap').NavItem;
var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var CollapsibleNav = require('react-bootstrap').CollapsibleNav;
var settings = require('../../settings.js');
var scope = {};
scope.widgets = require('./Widget'); 
// Method to retrieve state from Stores
function getThingState() {
  
  var b = [{thing:'cbus-254-56-61',item:'level'},{thing:'mesh-099',item:'voltage'}];
  var c = b.map(function(t){
      return ThingStore.getItem(t.thing,t.item);
  });
  
  return {items:c};
}

function getSitemap() {
  
}

function updateState(state) {

   state.label = state.sitemap.label;
  var elements = state.sitemap.elements;
  state.position.forEach(function(e,i,a){
    
    elements = elements[e].elements;
  });
  var c = elements.map(function(t){
    var thing = ThingStore.getThing(t.thing);
    // console.log('+++');
     
    // console.log(t);
    if (typeof thing === 'undefined'){
      if(typeof t.widget !== 'undefined' && typeof t.value === 'undefined' && typeof t.elements !== 'undefined'){
        // switch (t.widget) {
        //   case "Flag":
        //     var x = true;
        //     t.elements.forEach(function(e,i,a){
        //       e.value
        //     });
        //   break;
        //   case "Text":
        //   break;
        //   var x = []
        // }
        return {thing:{},item:{},properties:t}  
        
        
      } else {
        return {thing:{},item:{},properties:t}
      }
    } else {
      return {thing:thing,item:_.find(thing.items,function(e,i,a){return e._id === t.item}),properties:t};
    }

  });
  var thestate = {elements:c};//  {elements:c.filter(function(value){return (typeof value !== 'undefined')})};
  return thestate;
}

function updateItemState(state,thing,item) {
  
  state.elements.map(function(e,i,a) {
    if(e.thing._id === thing && e.item._id === item) {
      var t = ThingStore.getThing(t.thing);
      e.item = _.find(t.items,function(e,i,a){return e._id === item});
    }
  });
  return state;
}


// Define main Controller View
var ListSitemap = React.createClass({

  // Get initial state from stores
  getInitialState: function() {
    
    // console.log(999);
    return {elements:[],label:"",position:[],sitemap:{label:"",elements:[]}};
    //getThingState();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ThingStore.addChangeListener(this._onChange);
    $.get(settings.sitemapurl+this.props.source, function(result) { 
      
      var sitemap = result.sitemap;
      this.setState({sitemap:sitemap,position:[]});

  
      AutomationActions.receiveThings(result.things);
      //ThingStore.loadItems(sitemap.elements);
       
    }.bind(this));
    
  },

  // Remove change listers from stores
  componentWillUnmount: function() {
    ThingStore.removeChangeListener(this._onChange);
  },
//

  //     <Navbar brand={this.state.label}>
    
  //     <Nav navbar>
        
  //     </Nav>
  //     <Nav navbar right>
        
  //       <NavItem eventKey={1} onClick={function(){this.goBack()}.bind(this)}href='#'>Back</NavItem>
  //       <NavItem eventKey={2} onClick={function(){this.setPosition([])}.bind(this)} href='#'>Home</NavItem>
  //     </Nav>
    
  // </Navbar>

  // Render our child components, passing state via props
  render: function() {
    
  	return (
      <div className="flux-thing-app">
      
      <nav className="navbar navbar-default navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header pull-left">
      <button type="button" className="btn btn-default navbar-btn pull-left"  onClick={function(){this.goBack()}.bind(this)}>Back</button>
    </div>
    
    <span className="ui-brand pull-left">
      <a className="navbar-brand" href="#">
          
        {this.state.label}
      </a>
    </span>
    <div className="navbar-header pull-right">
    <button type="button" className="btn btn-default navbar-btn pull-right"  onClick={function(){this.setPosition([])}.bind(this)} >Home</button>
    </div>
  </div>
</nav>      

        <FluxThingList items={this.state.elements} setPosition={this.setPosition} scope={scope}/>

      </div>
  	);
  },

  goBack:function(){
    var p = this.state.position;
    p.pop();
    this.setPosition(p);
  },

  setPosition:function(position) {
//console.log(position);
    if (Array.isArray(position)) {
      var s = this.state;
      s.position = position;
//      console.log("array");
      this.setState(updateState(s));
      //this.setState({position:position});
    } else {
      var s = this.state;
      s.position.push(position);
      this.setState(updateState(this.state));
    }
    

  },

  // Method to setState based upon Store changes
  _onChange: function() {
    
    this.setState(updateState(this.state));
    
  }

});

module.exports = ListSitemap;