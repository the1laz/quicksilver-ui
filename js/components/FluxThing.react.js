var React = require('react');
var AutomationActions = require('../actions/AutomationActions');
var SendActions = require('../actions/SendActions');

var _ = require('underscore');
// Flux product view
var defaults = function(a){
  return _.find(a,function(val){
    return (typeof val !== 'undefined');
  })
};


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
    var scope = this.props.scope;
    var type = defaults([this.props.properties.type , this.props.item.type , 'text']);
    var GetWidget = defaults([scope.widgets[this.props.properties.widget] , scope.widgets[this.props.item.widget] , scope.widgets['Text']]);
    var image = defaults([this.props.properties.icon , this.props.item.icon , this.props.thing.icon , "default.png"]);
    var label = defaults([this.props.properties.label ,this.props.item.label ,this.props.thing.label , this.props.item._id , ""]);
    var value = defaults([this.props.properties.value,this.props.item.value,""]);
    var widgetlabel = defaults([this.props.properties.widgetlabel ,this.props.item.widgetlabel, label, ""]);
    var widgetvalue = defaults([this.props.properties.widgetvalue,this.props.item.widgetvalue,""]);
    var thing = defaults([this.props.properties.thing,this.props.thing._id,""]);
    var item = defaults([this.props.properties.item,this.props.item._id,""]);

    return (


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

    );
  },

});

module.exports = FluxThing;