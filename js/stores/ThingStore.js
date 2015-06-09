var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AutomationConstants = require('../constants/AutomationConstants');
var _ = require('underscore');


//Things things[_id]



// Define initial data points
var _things = {};
var _items = {};
// Method to load product data from mock API
function loadThings(data) {
  
  data.forEach(function(e, i, a) {
    _things[e._id] = e;
  });
}

function loadItems(data) {

  data.forEach(function(e, i, a) {
    _items[e.thing+'.'+e.item] = e;
  }); 
}

function updateItem(data) {
  if(typeof _things[data.thing] !== 'undefined'){
    var item = _.find(_things[data.thing].items,function(e,i,a){return e._id === data.item});
    if(typeof item !== 'undefined'){
      item.value = data.value;
    }
  }
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var ThingStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getThing: function(t) {
    return _.find(_things,function(e,i,a){return e._id === t});
  },

  getItem: function(t,i) {
    return _items[t+'.'+i];
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch (action.actionType) {
    case AutomationConstants.RECEIVE_THINGS:
      loadThings(action.data);
      break;
    case AutomationConstants.RECEIVE_ITEMS:
      loadItems(action.data);
      break;
    case AutomationConstants.UPDATE_ITEM:
      updateItem(action.data);      
      break;


    default:
      return true;
  }
  
  // If action was responded to, emit change event
  ThingStore.emitChange();

  return true;

});

module.exports = ThingStore;