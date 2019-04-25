
// 引入SDK核心类
var QQMapWX = require('./qqmap-wx-jssdk.js');
var qqmapsdk = new QQMapWX({
  key: 'LTWBZ-5I23Q-6IW5M-GDLZ2-DVMGJ-FYBSS'
});

Page({
  data: {
    longitude: 0,
    latitude: 0,
    address:'',
    markers:[],
    nickName:'',
    avatarUrl:'',
  },
  geoAddress(lati, long) {
    var that = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: lati,
        longitude: long
      },
      success: function (addressRes) {
        console.log(addressRes);
        var address = addressRes.result.formatted_addresses.recommend;
        console.log(address);
        that.setData({
          address: address,
        })
      },
      fail: function (res) {
        console.log(res);
        wx.showToast({
          title: '解析地址错误',
          icon: 'loading',
          duration: 1000
        });

      },

    })
  },

  getUserMsg:function(){
    var _this = this;
    wx.getUserInfo({
      success(res) {
        const userInfo = res.userInfo
        const nickName = userInfo.nickName
        const avatarUrl = userInfo.avatarUrl
        const gender = userInfo.gender // 性别 0：未知、1：男、2：女
        const province = userInfo.province
        const city = userInfo.city
        const country = userInfo.country
        _this.setData({
          nickName: nickName,
          avatarUrl: avatarUrl
        });
      },
      fail(error){
        console.log(error);
      }
    });
  },

  requestLocation:function(){
    var that = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(longitude);
        that.geoAddress(latitude, longitude);
        that.setData({
          longitude: longitude,
          latitude: latitude,
          markers: [{
            iconPath: '../../images/campus_location.png',
            id: 0,
            width: 32,
            height: 32,
            latitude: latitude,
            longitude: longitude,
            title: '我的位置',
          }]
        });
      },
    })
  },
  onGotUserInfo(e) {
    this.getUserMsg();
  },
  onLoad: function () {
    // 实例化API核心类
    this.getUserMsg();
  },

  onShow:function(){
    this.requestLocation();
  }

})

