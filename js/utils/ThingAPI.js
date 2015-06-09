var AutomationActions = require('../actions/AutomationActions');
var settings = require('../../settings.js');

//var WebSocket = require('ws');

 //ws.on('open', function() {
//     ws.send('something');
// });
// ws.on('message', function(message) {
//     console.log('received: %s', message);
// });
var ws = {};
var wstimeout = {};
function createWebsocket(){
    console.log('creating websocket');
    ws = new WebSocket(settings.websocketurl);
    ws.onopen = function(event) {
      clearTimeout(wstimeout);
      console.log('websocket connected');
      console.log(ws);
    };
    ws.onmessage = function(event) {
      //console.log('websocket message:'+event.data);
      var data = JSON.parse(event.data);
      switch (data.type) {
        case "item":
          AutomationActions.updateItem(data.payload);
      }
    };
    ws.onclose = function() {
      console.log('websocket closed');
      setTimeout(function(){
        createWebsocket();
      },1000);
    }  
}

module.exports = {

  init: function() {

        createWebsocket();

  },
  // Load mock product data from localStorage into ProductStore via Action
  getThingData: function() {
  	
    var data = JSON.parse(localStorage.getItem('thing'));
    AutomationActions.receiveThings(data);
  },

  getItemData: function() {
    var data = JSON.parse(localStorage.getItem('items'));
    AutomationActions.receiveItems(data);
  },

  sendItemData: function(item) {
    console.log(item);
    ws.send(JSON.stringify({type:'item',action:'command',payload:item}));
  }

}