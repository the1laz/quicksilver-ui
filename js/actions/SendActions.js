var AppDispatcher = require('../dispatcher/AppDispatcher');
var AutomationConstants = require('../constants/AutomationConstants');
var ThingAPI = require('../utils/ThingAPI');

var AutomationActions = {

  
  sendItemUpdate: function(thing,item,value) {
  	
  	ThingAPI.sendItemData({thing:thing,item:item,value:value});
  	console.log("send:"+thing+","+item+","+value);
  }

//send update to server	

}

module.exports = AutomationActions;