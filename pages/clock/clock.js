const app = getApp()
var mqtt = require('../../utils/mqtt.js');
//一个全局变量...
var client = null;
Page({
  data: {
    items: [
    {"ID":'1',"Time":"12:13","isOpen":true,"type":"one"},
    {"ID":'2',"Time":"12:13","isOpen":true,"type":"one"},
    {"ID":'3',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'4',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'5',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'6',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'7',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'8',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'9',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'10',"Time":"12:13","isOpen":false,"type":"one"},
    {"ID":'11',"Time":"12:13","isOpen":false,"type":"one"}], // 数据列表 
  },
  onLoad:function() {
    var client = app.globalData.client
    client.on('message', function (topic, message) {
      //如果接受的消息是简单的字符串
      console.log('received msg:' + message.toString());
      //解析JSON数据的方法
      console.log(JSON.parse(message.toString()).msg);
    })
  },
  setclockAction: function() {
    wx.navigateTo({
      url: '../setclock/setclock'
    })
  },
  Change: function(e) {
    var data = e.currentTarget.dataset.item;
    var id = e.currentTarget.dataset.id;
    const items = this.data.items
      for (let i = 0, len = items.length; i < len; ++i) {
        if(items[i].ID === id){
          items[i].isOpen = !items[i].isOpen
        }
      }
      this.setData({
        items
      })
      console.log(this.data.items)
  },
  changeclockAction: function(e){
    
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../setclock/setclock?clockid='+id
    })
  }
})