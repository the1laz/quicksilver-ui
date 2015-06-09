var AppDispatcher = require('../dispatcher/AppDispatcher');
var AutomationConstants = require('../constants/AutomationConstants');


var AutomationActions = {

  receiveThings: function(data) {
    AppDispatcher.handleAction({
      actionType: AutomationConstants.RECEIVE_THINGS,
      data: data
    })
  },

  receiveItems: function(data) {
  	AppDispatcher.handleAction({
  		actionType: AutomationConstants.RECEIVE_ITEMS,
  		data:data
  	})
  },

  updateItem: function(data) {
    AppDispatcher.handleAction({
      actionType: AutomationConstants.UPDATE_ITEM,
      data:data
    })
  },

  sendItemUpdate: function(thing,item,value) {
  	//console.log(ThingAPI);
  	ThingAPI.sendItemData({thing:thing,item:item,value:value});
  	console.log("send:"+thing+","+item+","+value);
  },
  setSitemapPosition:function() {
    AppDispatcher.handleAction({
      actionType: AutomationConstants.POSITION_SITEMAP,
      data:data
    })
  }

//send update to server	

}

module.exports = AutomationActions;