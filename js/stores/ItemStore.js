var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AutomationConstants = require('../constants/AutomationConstants');
var _ = require('underscore');


//Things things[_id]



// Define initial data points
var _items = {};

// Method to load product data from mock API
function loadItems(data) {
  
  data.forEach(function(e, i, a) {
    _items[e._id] = e;
  });
  
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var ItemStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getItem: function(t) {
    return _items[t];
  },

  getItems: function() {
    return _items;
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
    case AutomationConstants.RECEIVE_ITEMS:
      loadItems(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  ItemStore.emitChange();

  return true;

});

module.exports = ItemStore;