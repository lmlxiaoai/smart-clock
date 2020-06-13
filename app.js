//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    this.connectMqtt();
  },
  connectMqtt: function () {
    var mqtt=this.globalData.mqtt
    var client = this.globalData.client
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
      client.subscribe('testtopic', {
        qos: 0
      }, function (err) {
        if (!err) {
          console.log("订阅成功")
        }
      })
    })
    this.globalData.client = client
    /*
    client.on('message', function (topic, message) {
      //如果接受的消息是简单的字符串
      console.log('received msg:' + message.toString());
      //解析JSON数据的方法
      console.log(JSON.parse(message.toString()).msg);
    })
    */
  },
  globalData: {
    userInfo: null,
    mqtt : require('/utils/mqtt.js'),
//一个全局变量...
    client : null
  }
})