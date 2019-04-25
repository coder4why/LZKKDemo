

Page({
  data: {
    currentIndex: 0,
    jokeList: [],
  },

  onPullDownRefresh: function () {
    console.log('下拉加载更多');
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.requestMsgs(false);
  },
  onReachBottom: function () {
    console.log('上拉刷新');
    wx.showNavigationBarLoading();
    this.requestMsgs(true);
  },
  onShareAppMessage: function (msg) {
    console.log(msg);
  },

  f0:function(itemMsg){
      console.log(itemMsg);
      var index = itemMsg.currentTarget.dataset.index;
      var item = itemMsg.currentTarget.dataset.item;
      if(item.type=='video'){
          var img = 'jokeList[' + index + '].thumbnail'
          this.setData({
            [img] : '../../images/loadFail.png'
          });
      } else if (item.type == 'gif') {
        var img = 'jokeList[' + index + '].gif'
        this.setData({
          [img]: '../../images/loadFail.png'
        });

      } else if (item.type == 'image') {
        var img = 'jokeList[' + index + '].image'
        this.setData({
          [img]: '../../images/loadFail.png'
        });
      }
  },
  // https://api.apiopen.top/getJoke?page=1&count=2&type=text

  requestMsgs: function (isBottom) {
    var that = this;
    wx.request({
      url: 'https://api.apiopen.top/getJoke',
      data: {
        "type":"text",
        "page": 0,
        "count":20,
      },
      success: function (res) {
        console.log(res);
        if (res.data.code == 200) {
          var data = res.data.result;
          if (isBottom) {
            data = that.data.jokeList.concat(data);
          } else {
            data = data.concat(that.data.jokeList);
          }
          that.setData({
            jokeList: data
          });
          wx.hideNavigationBarLoading();
          if (isBottom == false) {
            wx.stopPullDownRefresh();
          }
        }
      },
      fail: function (err) {
      },
      complete: function (res) {
      },

    });
  },

  onLoad: function () {
    this.requestMsgs(false);
  },

})
