module.exports = {
  // Load Mock Product Data Into localStorage
  init: function() {
    //    localStorage.clear();
    localStorage.setItem('thing', JSON.stringify([{
      _id:'cbus-254-56-61',
      parent:null,
      label:'much test'
    },
    {
      _id:'mesh-099',
      parent:'voltage',
      label:'wow'
    }]));

    localStorage.setItem('items',JSON.stringify([
      {
        _id:'cbus-254-56-61.level',
        thing:'cbus-254-56-61',
        item:'level',
        label:'much test',
        value:1,
        type:'number',
        icon: 'scotch-beer.png',
        widget:'Slider'
      },
      {
        _id:'mesh-099.voltage',
        thing:'mesh-099',
        item:'voltage',
        label:'wow',
        value:2,
        type:'number',
        icon: 'scotch-beer.png',
        widget:'Slider'
      }
      ]));

  }

};