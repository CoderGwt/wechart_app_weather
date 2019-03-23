Page({

  /**
   * 页面的初始数据
   */
  data: {
    city:"",
    temperature:"",
    humidity: "",
    aqi: "",
    power: "",
    direct: "",
    right: false,
    region: ['广东省', '广州市'],
    customItem: ''
  },

  bindRegionChange: function (e) {
    var self = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    console.log(e.detail.value[0])
    var provice = e.detail.value[0].slice(0, -1);
    var city = e.detail.value[1].slice(0, -1);
    var country = e.detail.value[2].slice(0, -1);
    console.log(provice, city, country)
    this.setData({
      region: e.detail.value,
      // city: city
    });

    // 请求到城市之后，就获取该城市的天气情况
    wx.request({
      url: 'http://apis.juhe.cn/simpleWeather/query',
      data: {
        city: city,
        key: "3de2c1e1c5080d23987fc22e1dc3b3d5",
      },
      method: 'get',
      success: function (msg) {

        if (!msg.data.result) {
          self.setData({
            right: false
          });

          wx.showModal({
            title: '错误提示',
            content: '输入的城市有误，请重新输入',
          })

          return;
        }

        console.log(msg);
        console.log(msg.data.result.realtime);
        var realtime = msg.data.result.realtime;
        var future = msg.data.result.future;
        self.setData({
          city: msg.data.result.city,
          temperature: realtime.temperature,
          humidity: realtime.humidity,
          power: realtime.power,
          direct: realtime.direct,
          aqi: realtime.aqi,
          futureWeather: future,
          right: true
        })
      },
      fail: function (error) {
        console.log(error);
        wx.showToast({
          title: '获取数据失败',
        })
      }
    })



  },

  getWeather: function(){

    var self = this;

    wx.getLocation({
      success: function(res) {
        console.log(res);

        var latitude = res.latitude.toFixed(5);
        var longitude = res.longitude.toFixed(5);
        
        wx.request({
          url: 'https://wx.maoyan.com/hostproxy/locate/v2/rgeo',
          data: {
            coord: [latitude,longitude,1].join(",")
          },
          header: {
            // 反爬机制吧应该
            "x-host": "http://apimobile.vip.sankuai.com"  
          }, 
          method: 'get',
          success: function(info){
            console.log(info);
            console.log(info.data.data.city)
            self.setData({
              city: info.data.data.city
            });

            // 请求到城市之后，就获取该城市的天气情况
            wx.request({
              url: 'http://apis.juhe.cn/simpleWeather/query',
              data: {
                city: self.data.city,
                key: "3de2c1e1c5080d23987fc22e1dc3b3d5",
              },
              method: 'get',
              success: function(msg){
                console.log(msg);
                console.log(msg.data.result.realtime);
                var realtime = msg.data.result.realtime;
                var future = msg.data.result.future;

                self.setData({
                  temperature: realtime.temperature,
                  humidity: realtime.humidity,
                  power: realtime.power,
                  direct: realtime.direct,
                  aqi: realtime.aqi,
                  futureWeather: future,
                  right: true
                })
              }
            })
          }
        })
      },
    });
  },

  getDetailMsg: function(){

  },

  // blurMsg: function(e){
  //   console.log(e);
  //   console.log(e.detail.value);
  //   var city = e.detail.value;
  //   this.setData({
  //     city: city
  //   })
  // },

  getDetailMsg: function(){
    var self = this;
    
    // 请求到城市之后，就获取该城市的天气情况
    wx.request({
      url: 'http://apis.juhe.cn/simpleWeather/query',
      data: {
        city: self.data.city,
        key: "3de2c1e1c5080d23987fc22e1dc3b3d5",
      },
      method: 'get',
      success: function (msg) {
        
        if (!msg.data.result) {
          self.setData({
            right: false
          });

          wx.showModal({
            title: '错误提示',
            content: '输入的城市有误，请重新输入',
          })
        
        return;
        }

        console.log(msg);
        console.log(msg.data.result.realtime);
        var realtime = msg.data.result.realtime;
        var future = msg.data.result.future;
        self.setData({
          city: msg.data.result.city,
          temperature: realtime.temperature,
          humidity: realtime.humidity,
          power: realtime.power,
          direct: realtime.direct,
          aqi: realtime.aqi,
          futureWeather: future,
          right: true
        })
      },
      fail: function (error) {
        console.log(error);
        wx.showToast({
          title: '获取数据失败',
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})