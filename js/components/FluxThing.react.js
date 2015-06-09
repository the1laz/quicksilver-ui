var React = require('react');
var AutomationActions = require('../actions/AutomationActions');
var SendActions = require('../actions/SendActions');
var Widget = require('./Widget'); 
var Button = require('react-bootstrap').Button;

var _ = require('underscore');
// Flux product view
var defaults = function(a){
  return _.find(a,function(val){
    return (typeof val !== 'undefined');
  })
};

var ButtonWidget = React.createClass({

  render:function(){
    return (<Button onClick={this.props.onClick}>{this.props.value}</Button>);
  }
});

var FluxThing = React.createClass({

  sendUpdate:function(value){
    // console.log('update');
      console.log(value);
    SendActions.sendItemUpdate(defaults([this.props.properties.thing,this.props.thing._id,""]),defaults([this.props.properties.item,this.props.item._id,""]),value);
  },

getDefaultProps: function() {
    return {
      value: 'default value'
    };
  },
  
  // Render product View
  render: function() {

    var type = defaults([this.props.properties.type , this.props.item.type , 'text']);
    var GetWidget = defaults([Widget[this.props.properties.widget] , Widget[this.props.item.widget] , Widget['Text']]);
    var image = defaults([this.props.properties.icon , this.props.item.icon , this.props.thing.icon , "default.png"]);
    var label = defaults([this.props.properties.label ,this.props.item.label ,this.props.thing.label , this.props.item._id , ""]);
    var value = defaults([this.props.properties.value,this.props.item.value,""]);
    var widgetlabel = defaults([this.props.properties.widgetlabel ,this.props.item.widgetlabel, label, ""]);
    var widgetvalue = defaults([this.props.properties.widgetvalue,this.props.item.widgetvalue,""]);
    var thing = defaults([this.props.properties.thing,this.props.thing._id,""]);
    var item = defaults([this.props.properties.item,this.props.item._id,""]);
    // console.log("***");
    // console.log(this.props.thing);
    //var GetWidget = Widget['Text'];
     //console.log(Widget[this.props.properties.widget]);
    // console.log(this.props.item);

    return (
// <div className='media'>
//         <div className='media-left ui-icon'>
//           <img  src={'img/' + image}/>
//         </div>
//         <div className='media-body'>{label}</div>
//         <div className='media-right' onClick={function(ev){ev.stopPropagation();}}>
//         <GetWidget handleUpdate={this.sendUpdate} value={this.props.item.value} />
//         </div>
//       </div>

      <div>
        <div className='ui-icon pull-left'>
          <img  src={'img/' + image}/>
        </div>
        <div className='pull-left ui-label'><h5>{label}</h5></div>
        <div className='clearfix'>
          <div className='pull-right' onClick={function(ev){ev.stopPropagation();}}>
            <GetWidget handleUpdate={this.sendUpdate} value={value} item={item} thing={thing} label={label} widgetlabel={widgetlabel} widgetvalue={widgetvalue}/>
          </div>
        </div>
      </div>
      //
      //<div>1</div>
      //{this.props.thing.items[this.props.item]}
    );
  },

});


// <li className='media'>
//         <div className='media-left'>
//           <img  className='thingIcon' src={'img/' + this.props.item.icon}/>
//         </div>
//         <div className='media-body'>{this.props.item.label}</div>
//         <div className='media-right'><GetWidget handleUpdate={this.sendUpdate} value={this.props.item.value} />
//         </div>
//       </li>

module.exports = FluxThing;