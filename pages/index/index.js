//index.js
//获取应用实例
const app = getApp()
var mqtt = require('../../utils/mqtt.js');
//一个全局变量...
var client = null;
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    time:'20:20',
    items: [
      {"ID":'1',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'2',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'3',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'4',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'5',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'6',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'7',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'8',"Time":"12:13","isOpen":true,"type":"one"},
      {"ID":'9',"Time":"12:13","isOpen":false,"type":"one"},
      {"ID":'10',"Time":"12:13","isOpen":false,"type":"one"},
      {"ID":'11',"Time":"12:13","isOpen":false,"type":"one"}], // 数据列表
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log(app.globalData.client)
    client = app.globalData.client
    client.on('message', function (topic, message) {
      //如果接受的消息是简单的字符串
      console.log('received msg:' + message.toString());
      //解析JSON数据的方法
      console.log(JSON.parse(message.toString()).msg);
    })
    //this.connectMqtt();
    /*
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
    */
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  setTimeAction: function(e) {
    this.setData({
      time: e.detail.value
    })
  },
  Change: function(e) {
    var data = e.currentTarget.dataset.item
    var id = e.currentTarget.dataset.id
    const items = this.data.items
    for (let i = 0, len = items.length; i < len; ++i) {
       if(items[i].ID === id){
         items[i].isOpen = !items[i].isOpen
       }
    }
    //向设备发送消息
    client.publish('test','111')
    this.setData({
     items
    })
    console.log(this.data.items)
  }
})
