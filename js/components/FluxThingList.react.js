var React = require('react');
var FluxThingActions = require('../actions/FluxCartActions');
var FluxThing = require('./FluxThing.react');
var ListGroup = require('react-bootstrap').ListGroup;
var ListGroupItem = require('react-bootstrap').ListGroupItem;
var Button = require('react-bootstrap').Button;
// Flux product view
var FluxThingList = React.createClass({

  
  // Render product View
  render: function() {
    var thingNodes = this.props.items.map(function(element,i){
    // console.log('properties');
    // console.log(element.properties);
    var click = element.properties.elements ? function(){this.props.setPosition(i);}.bind(this) :null;
    
    // onClick={click}
    var cname = element.properties.elements ? 'bs-callout bs-callout-primary' :'bs-callout bs-callout-default';
      return (
        <ListGroupItem className={cname} onClick={click}>
          <FluxThing thing={element.thing} item={element.item} properties={element.properties}/>
        </ListGroupItem>
      );
    }.bind(this));
    return (

      <ul className='itemList list-group'>
        {thingNodes}
      </ul>
    );
  }
});


module.exports = FluxThingList;