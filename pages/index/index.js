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
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
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
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  connectMqtt: function () {
    const options = {
      connectTimeout: 4000, // 超时时间
      clientId: 'wx_' + parseInt(Math.random() * 100 + 800, 10),
      port: 80,  //重点注意这个,坑了我很久
      username: 'admin',
      password: 'public',
      reconnect: true,
    }

    client = mqtt.connect('wx://112.124.12.115/mqtt', options)
    client.on('reconnect', (error) => {
      console.log('正在重连:', error)
    })

    client.on('error', (error) => {
      console.log('连接失败:', error)
    })

    let that = this;
    client.on('connect', (e) => {
      console.log('成功连接服务器')
      　　　　　　　//订阅一个主题
      client.subscribe('message.queue', {
        qos: 0
      }, function (err) {
        if (!err) {
          console.log("订阅成功")
          client.publish('message.queue', 'Hello MQTT')
        }
      })
    })
    client.on('message', function (topic, message) {
      console.log('received msg:' + message.toString());
    })
  },
})
