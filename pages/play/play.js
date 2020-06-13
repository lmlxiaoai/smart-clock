const app = getApp()
var mqtt = require('../../utils/mqtt.js');
//一个全局变量...
var client = null;
Page({
  data: {
    items: [
      {"ID":'1',"Music":"音乐1","isPlay":false,"ischoose":true},
      {"ID":'2',"Music":"音乐2","isPlay":false,"ischoose":false},
      {"ID":'3',"Music":"音乐3","isPlay":false,"ischoose":false},
      {"ID":'4',"Music":"音乐4","isPlay":false,"ischoose":false},
    ], // 数据列表
  },
  onLoad:function() {
    client = app.globalData.client
    client.on('message', function (topic, message) {
      //如果接受的消息是简单的字符串
      console.log('received msg:' + message.toString());
      //解析JSON数据的方法
      console.log(JSON.parse(message.toString()).msg);
    })
  },
  playAction: function(e) {
    var data = e.currentTarget.dataset.item;
    var id = e.currentTarget.dataset.id;
    const items = this.data.items
      for (let i = 0, len = items.length; i < len; ++i) {
        if(items[i].ID !== id){
          items[i].isPlay = false 
          //关闭其他所有音乐
        }
        else{
          items[i].isPlay=!items[i].isPlay
        }
      }
      this.setData({
        items
      })
  },
  chooseAction: function(e) {
    var data = e.currentTarget.dataset.item;
    var id = e.currentTarget.dataset.id;
    const items = this.data.items
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].ischoose = items[i].ID === id

      }
      this.setData({
        items
      })
  },

  })