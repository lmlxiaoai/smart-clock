Page(
  {
    data:{
      "ID":'',
      "Time": '12:01',
      "isOpen":true,
      "type":'',
      items: [
        {value: 'repeat', name: '重复'},
        {value: 'one', name: '只响一次', checked: 'true'},
      ],
      //clock 模拟读取的全部闹钟
      clock: [
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
        {"ID":'11',"Time":"12:13","isOpen":false,"type":"one"}
      ],
      ishidden:true
    },
    onLoad:function(clockid){
      //先读取全部闹钟信息
      console.log(clockid)
      var num = clockid['clockid']
      console.log(this.data.clock[num])
      if(clockid!=null){
        this.setData({
          ID:clockid,
          Time:this.data.clock[num].Time,
          isOpen:this.data.clock[num].isOpen,
          type:this.data.clock[num].type,
          ishidden:false
        })
        if(this.data.type==='repeat'){
          const items = this.data.items
          items[0].checked = true
          items[1].checked = false
          this.setData({
            items
          })
        }
        else {
          const items = this.data.items
          items[0].checked = false
          items[1].checked = true
          this.setData({
            items
          })
        }
        console.log(this.data.Time)
      }
      else{
        this.setData({ID:clock.length+1})
      }
    },
    setTimeAction: function(e) {
      this.setData({
        time: e.detail.value
      })
    },
    submitAction :function(){
      wx.navigateBack()
    },
    radioChange(e) {  
      const items = this.data.items
      for (let i = 0, len = items.length; i < len; ++i) {
        items[i].checked = items[i].value === e.detail.value
      }
      kclock.type=e.detail.value
      this.setData({
        items
      })
    },
    deleteAction:function(e) {
      
    }
  }
)