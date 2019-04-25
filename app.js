//app.js
App({

  onLaunch: function () {
    wx.setTabBarBadge({
      index: 3,
      text: '10'
    });
    wx.showTabBarRedDot({
      index: 0,
    })
  },
  globalData: {
    userInfo: null
  },

})